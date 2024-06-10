FROM bitnami/postgresql:latest

COPY init.sql /docker-entrypoint-initdb.d/
USER root