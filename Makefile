up:
	docker compose up -d --build --force-recreate

down:
	docker compose down

migrate:
	docker compose exec api php artisan migrate

api:
	docker compose exec api bash