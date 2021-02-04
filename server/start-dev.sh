#!/bin/sh 

echo "Waiting for postgres..."

while ! nc -z $DBHOST $DBPORT; do
  sleep 0.1
done

echo "PostgreSQL started"

# run migrations
alembic upgrade head

uvicorn main:app --reload --host 0.0.0.0 --port 80 --log-level info --root-path /api