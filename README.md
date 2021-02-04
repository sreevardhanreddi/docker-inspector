# Docker Inspector

## Stack

- FAST API (with sqlalchemy as an **ORM**)
- Postgresql
- React
- Docker (for dev and prod)

## Development

```

docker-compose -f docker-compose.dev.yml up --build

```

## Production

```

docker-compose -f docker-compose.prod.yml up --build -d

```

## Required Environment Variables

```
# filename .env

POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=db_name
DBHOST=database
DBPORT=5432


```
