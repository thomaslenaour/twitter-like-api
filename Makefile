start:
	npm run docker:db
	npm run start:dev

db.reset:
	docker stop twitter-like-api
	docker rm twitter-like-api
	docker volume twitter-like-api-db