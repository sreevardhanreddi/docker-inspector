# API


## Migrations setup with alembic

```
# init alembic for managing migrations
alembic init alembic

# generate migrations files
alembic revision --autogenerate -m 'added users'

# apply migrations
alembic upgrade head

```
