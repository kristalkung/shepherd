from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Company(db.Model):
    """A company user."""

    __tablename__ = "users"

    company_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    company_name = db.Column(db.String, unique=True)
    contact_email = db.Column(db.String, unique=True)

    def __repr__(self):
        return f"<Company company_id={self.company_id} email = {self.contact_email}>"
    

class FixedOption(db.Model):
    """Application for fixed options."""

    __tablename__ = "fixed"

    fixed_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    company_name = db.Column(db.String)
    contact_email = db.Column(db.String)
    project_name = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    coverage_requested = db.Column(db.String)

    def __repr__(self):
        return f"<FixedOption fixed_id={self.fixed_id} company_name={self.company_name} coverage={self.coverage_requested}"

class FlexibleOption(db.Model):
    """Application for flexible options."""

    __tablename__ = "flexible"

    flexible_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    company_name = db.Column(db.String)
    contact_email = db.Column(db.String)
    project_name = db.Column(db.String)
    project_type = db.Column(db.String)
    coverage_requested = db.Column(db.String)

    def __repr__(self):
        return f"FlexibleOption flexible_id={self.flexible_id} company_name={self.company_name} coverage={self.coverage_requested}"

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

