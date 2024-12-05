#!/bin/bash
mkdir certs
openssl req -x509 -newkey rsa:4096 -keyout certs/privkey.pem -out certs/cert.pem -sha256 -days 3650 -nodes \
-subj "/C=RU/ST=test/L=test/O=.../OU=.../CN=.../emailAddress=..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile full up -d --build