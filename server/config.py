import os

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 2  # 60 mins * 24 hrs * 2 days
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"


def get_url():
    DBUSER = os.environ.get("POSTGRES_USER")
    DBPASS = os.environ.get("POSTGRES_PASSWORD")
    DBHOST = os.environ.get("DBHOST")
    DBPORT = os.environ.get("DBPORT")
    DBNAME = os.environ.get("POSTGRES_DB")
    return "postgresql://{user}:{passwd}@{host}:{port}/{db}".format(
        user=DBUSER, passwd=DBPASS, host=DBHOST, port=DBPORT, db=DBNAME
    )


SQLALCHEMY_DATABASE_URL = get_url()
