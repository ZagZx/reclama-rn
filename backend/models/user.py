from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from backend.extensions import db


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)