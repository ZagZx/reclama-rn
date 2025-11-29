from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def init_env(path = "../.env"):
    from secrets import token_hex
    import os


    if not os.path.exists(path):
        variables = []
        variables.append(f'DATABASE="sqlite:///database.db"')
        variables.append(f'SECRET_KEY="{token_hex()}"')
        variables.append('BACKEND_URL="http://localhost:5000"')
        variables.append('FRONTEND_URL="http://localhost:3000"')

        with open(path, "w") as env:
            env.write("\n".join(variables) + "\n")
    

def init_db(app: Flask):
    import backend.models

    with app.app_context():
        db.create_all()


login_manager = LoginManager()
# login_manager.login_view = "auth.login"
# login_manager.login_message = "Faça login para realizar essa ação"
# login_manager.login_message_category = "error"


@login_manager.user_loader
def load_user(user_id):
    from backend.models import User

    # Use session.get for SQLAlchemy 2.x compatibility
    try:
        return db.session.get(User, int(user_id))
    except Exception:
        return None