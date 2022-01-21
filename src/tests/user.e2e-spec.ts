import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { useContainer } from 'class-validator';

import { AppModule } from 'src/app.module';
import { User } from 'src/business/user/models/user.model';
import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateUserInput } from 'src/business/user/dto/create-user.input';

const GQL_ENDPOINT = '/graphql';

const createUserInput: CreateUserInput = {
  name: 'Thomas test',
  pseudo: 'thomas_test',
  email: 'tln@test.com',
  password: 'password',
  birthDate: new Date('2000-03-21'),
};

describe('User (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(async () => {
    await prisma.truncate();
    await prisma.resetSequences();
    await prisma.$disconnect();
    await app.close();
  });

  describe(GQL_ENDPOINT, () => {
    describe('signup user', () => {
      it('should returns an error for missing field', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: `
            mutation {
              signup(
                data: {
                  name: "${createUserInput.name}"
                  pseudo: "${createUserInput.pseudo}"
                  email: "${createUserInput.email}"
                  birthDate: "${createUserInput.birthDate}"
                }
              ) {
                accessToken
                refreshToken
                user {
                  name
                  pseudo
                  email
                  role
                }
              }
            }
          `,
          })
          .expect(400)
          .expect(({ body }) => {
            expect(body.errors[0].extensions.code).toBe(
              'GRAPHQL_VALIDATION_FAILED',
            );
          });
      });

      it('should returns a new created user', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: `
            mutation {
              signup(
                data: {
                  name: "${createUserInput.name}"
                  pseudo: "${createUserInput.pseudo}"
                  email: "${createUserInput.email}"
                  password: "${createUserInput.password}"
                  birthDate: "${createUserInput.birthDate}"
                }
              ) {
                accessToken
                refreshToken
                user {
                  name
                  pseudo
                  email
                  role
                }
              }
            }
          `,
          })
          .expect(200)
          .expect(({ body }) => {
            const { accessToken, refreshToken, user } = body.data.signup;

            expect(typeof accessToken).toBe('string');
            expect(typeof refreshToken).toBe('string');
            expect(user).toEqual({
              name: createUserInput.name,
              email: createUserInput.email,
              pseudo: createUserInput.pseudo,
              role: 'USER',
            });
          });
      });

      it('should returns an error for pseudo already used', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: `
            mutation {
              signup(
                data: {
                  name: "${createUserInput.name}"
                  pseudo: "${createUserInput.pseudo}"
                  email: "${createUserInput.email}"
                  password: "${createUserInput.password}"
                  birthDate: "${createUserInput.birthDate}"
                }
              ) {
                accessToken
                refreshToken
                user {
                  name
                  pseudo
                  email
                  role
                }
              }
            }
          `,
          })
          .expect(({ body }) => {
            expect(body.errors[0].message).toBe(
              'The email or pseudo is already taken.',
            );
          });
      });
    });

    describe('login user', () => {
      describe('with email', () => {
        it('should returns an accessToken and refreshToken', () => {
          return request(app.getHttpServer())
            .post(GQL_ENDPOINT)
            .send({
              query: `
              mutation {
                login(data: {
                  emailOrPseudo: "${createUserInput.email}",
                  password: "${createUserInput.password}"
                }) {
                  accessToken
                  refreshToken
                }
              }
              `,
            })
            .expect(200)
            .expect(({ body }) => {
              const { accessToken, refreshToken } = body.data.login;

              expect(typeof accessToken).toBe('string');
              expect(typeof refreshToken).toBe('string');
            });
        });

        it('should returns an error for invalid password', () => {
          return request(app.getHttpServer())
            .post(GQL_ENDPOINT)
            .send({
              query: `
              mutation {
                login(data: {
                  emailOrPseudo: "${createUserInput.email}",
                  password: "${createUserInput.password}ebdziue"
                }) {
                  accessToken
                  refreshToken
                }
              }
              `,
            })
            .expect(({ body }) => {
              expect(body.errors[0].message).toBe('Invalid password.');
            });
        });
      });

      describe('with pseudo', () => {
        it('should returns an accessToken and refreshToken', () => {
          return request(app.getHttpServer())
            .post(GQL_ENDPOINT)
            .send({
              query: `
              mutation {
                login(data: {
                  emailOrPseudo: "${createUserInput.pseudo}",
                  password: "${createUserInput.password}"
                }) {
                  accessToken
                  refreshToken
                }
              }
              `,
            })
            .expect(200)
            .expect(({ body }) => {
              const { accessToken, refreshToken } = body.data.login;

              expect(typeof accessToken).toBe('string');
              expect(typeof refreshToken).toBe('string');
            });
        });
      });

      it('should returns an error for invalid pseudo or email', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: `
            mutation {
              login(data: {
                emailOrPseudo: "doesnotexists@gmail.com",
                password: "${createUserInput.password}"
              }) {
                accessToken
                refreshToken
              }
            }
            `,
          })
          .expect(({ body }) => {
            expect(body.errors[0].message).toBe(
              'No user found for this email or pseudo.',
            );
          });
      });
    });
  });
});
