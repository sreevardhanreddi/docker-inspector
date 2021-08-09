import typer
from api.database import get_db
from api.models.users import User

app = typer.Typer()


@app.command()
def create_user_for_auth(
    username: str = typer.Argument(default=None, help="username"),
    email: str = typer.Argument(default=None, help="email"),
    password: str = typer.Argument(default="smchyd2021!", help="password"),
):
    """
    creates user in db
    """
    if username in [None, ""] or email in [None, ""]:
        raise ValueError("Username or Email must be valid")
    try:
        user = User(
            username=username,
            email=email,
            password=User.generate_hash(password),
        )
        db = next(get_db())
        db.add(user)
        db.commit()
        typer.echo(
            "Created user with username: {} | email: {} | password: {}".format(
                username, email, password
            )
        )
    except Exception as e:
        typer.echo(e)


@app.command()
def list_all_users():
    """
    lists all users
    """

    try:
        db = next(get_db())
        users = db.query(User).all()
        for user in users:
            typer.echo(
                "id: {} | username: {} | email: {} | password: {}".format(
                    user.id, user.username, user.email, user.password
                )
            )
    except Exception as e:
        typer.echo(e)


@app.command()
def delete_user(id: int):
    """
    delete a user based on id
    """

    try:
        db = next(get_db())
        users = db.query(User).filter_by(id=id)
        user = users.first()
        users.delete()
        db.commit()
        typer.echo(
            "Deleted user with id: {} | username: {} | email: {}".format(
                user.id, user.username, user.email
            )
        )
    except Exception as e:
        typer.echo(e)


if __name__ == "__main__":
    app()
