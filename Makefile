build-local:
	cd docker && docker-compose -f docker-compose.yml build

up-local:
	cd docker && docker-compose -f docker-compose.yml --env-file ../.env up -d

down-local:
	cd docker && docker-compose -f docker-compose.yml --env-file ../.env down

