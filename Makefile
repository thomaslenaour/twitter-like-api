start:
	npm run docker:db
	npm run prisma:migrate:deploy
	npm run start:dev

db.reset:
	docker stop twitter-like-api
	docker rm twitter-like-api
	docker volume rm twitter-like-api-db