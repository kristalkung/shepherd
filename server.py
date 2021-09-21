"""Server."""

from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db
# from crud import get_user_by_email
import crud
import model

from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
