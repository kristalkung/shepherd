from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class FixedOption(db.Model):
    """Application for fixed application option."""

    __tablename__ = "fixed"

    fixed_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    company_name = db.Column(db.String)
    contact_email = db.Column(db.String)
    coverage_requested = db.Column(db.String)

    def __repr__(self):
        return f"<FixedOption fixed_id={self.fixed_id} company_name={self.company_name} coverage={self.coverage_requested}>"

class FlexibleOption(db.Model):
    """Application for flexible application option."""

    __tablename__ = "flexible"

    flexible_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    company_name = db.Column(db.String)
    contact_email = db.Column(db.String)
    project_type = db.Column(db.String)

    def __repr__(self):
        return f"<FlexibleOption flexible_id={self.flexible_id} company_name={self.company_name}>"

class Applications(db.Model):
    """Applications relationship table. Foreign keys are fixed_id and flexible_id."""

    __tablename__ = "applications"

    application_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    fixed_id = db.Column(db.Integer, db.ForeignKey('fixed.fixed_id'), nullable=True)
    flexible_id = db.Column(db.Integer, db.ForeignKey('flexible.flexible_id'), nullable=True)

    fixed = db.relationship('FixedOption', backref='applications')
    flexible = db.relationship('FlexibleOption', backref='applications')

    def __repr__(self):
        return f"<Application id={self.application_id} fixed_id={self.fixed_id} flexible_id={self.flexible_id}>"

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

