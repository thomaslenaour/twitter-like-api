import { Prisma } from '@prisma/client';

export const user: Prisma.UserCreateManyInput[] = [
  {
    id: 'cjld2cjxh0000qzrmn831i7rn',
    name: 'Alex Boisseau',
    pseudo: 'boiss',
    email: 'alex@alex.com',
    password: '$2b$10$qtzUoXUYKhu9qSZbHwRqxecsYwi6h0pHgFSUgV.haeuBR2Phyov7W', // password
    birthDate: new Date('2000-09-21'),
  },
  {
    id: 'cjld2cyuq0000t3rmniod1foy',
    name: 'Thomas Le Naour',
    pseudo: 'tlnkorr',
    email: 'thomas@thomas.com',
    password: '$2b$10$qtzUoXUYKhu9qSZbHwRqxecsYwi6h0pHgFSUgV.haeuBR2Phyov7W',
    birthDate: new Date('2000-03-21'),
  },
  {
    id: 'cky4c2w48000008jwcdfn16rl',
    name: 'Sascha Salles',
    pseudo: 'sascha',
    email: 'sascha@sascha.com',
    password: '$2b$10$qtzUoXUYKhu9qSZbHwRqxecsYwi6h0pHgFSUgV.haeuBR2Phyov7W',
    birthDate: new Date('1999-08-12'),
  },
  {
    id: 'cky4c3mvy000108jw6f7k8zry',
    name: 'Théo Delas',
    pseudo: 'theo',
    email: 'theo@theo.com',
    password: '$2b$10$qtzUoXUYKhu9qSZbHwRqxecsYwi6h0pHgFSUgV.haeuBR2Phyov7W',
    birthDate: new Date('1997-12-08'),
  },
  {
    id: 'cky4c4ddv000208jw6g8uhtoz',
    name: 'Antoine Delbrel',
    pseudo: 'antoine',
    email: 'antoine@antoine.com',
    password: '$2b$10$qtzUoXUYKhu9qSZbHwRqxecsYwi6h0pHgFSUgV.haeuBR2Phyov7W',
    birthDate: new Date('1999-04-26'),
  },
];
