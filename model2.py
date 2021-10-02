from applications2 import application_options
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Applications(db.Model):
    """Applications relationship table. Foreign keys are fixed_id and flexible_id."""

    __tablename__ = "applications"

    application_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    form_values = db.Column(db.Text)


    def __repr__(self):
        return f"<Application id={self.application_id}>"


def connect_to_db(flask_app, db_uri='postgresql:///brokers', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    connect_to_db(app)

