#!/usr/bin/env python3
"""
Small helper to create a test user in the local SQLite DB.
Run from project root with the virtualenv activated:

source env/bin/activate
PYTHONPATH=$(pwd) python scripts/seed_admin.py

"""
from backend.extensions import db
from backend.app import app
from backend.models import User
from werkzeug.security import generate_password_hash

USERNAME = "admin"
EMAIL = "admin@example.com"
PASSWORD = "senha123"

with app.app_context():
    existing = User.query.filter_by(email=EMAIL).first()
    if existing:
        print(f"User {EMAIL} already exists (id={existing.id}).")
    else:
        u = User(username=USERNAME, email=EMAIL, password_hash=generate_password_hash(PASSWORD))
        db.session.add(u)
        db.session.commit()
        print(f"Created user {EMAIL} with id={u.id} and password='{PASSWORD}'")
