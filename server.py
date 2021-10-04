"""Server."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
from validate_email import validate_email
from fpdf import FPDF

import crud
import model
import applications

from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/form/<data>')
@app.route('/application')
@app.route('/')
def homepage():
    """View homepage."""

    return render_template('root.html')

@app.route('/application/<option_type>')
def application_homepage(option_type):
    """View homepage."""

    return render_template('root.html')

@app.route('/buttons')
def return_application_buttons():
    """Returns the applcation buttons for the homepage."""

    option_buttons = []

    for application_option in applications.application_options:
        option_buttons.append(application_option['type'])
    
    return jsonify(option_buttons)


@app.route('/api/application/<option_type>/', methods=['GET'])
def application_type(option_type):
    """Returns the application form based on the option chosen."""

    for application_option in applications.application_options:
        if application_option['type'] == option_type:
            fields = application_option['fields']

    return jsonify(fields)

@app.route('/submission', methods=['POST'])
def validate_submission():
    """Receives form data from applications.jsx and does the following:
        - validates email and coverage_requested (must be int)
        - adds form data to db
        - creates pdf of form data and saves to local"""

    form_inputs = request.json.get('fieldsState')

    print(form_inputs)
    option_type = form_inputs['option_type']
    contact_email = form_inputs['contact_email']

    if form_inputs.get('coverage_requested'):
        coverage_requested = form_inputs['coverage_requested']
    
    # from p3-validate-email package
    is_valid_email = validate_email(email_address=contact_email,
                                    check_format=True,
                                    check_blacklist=True,
                                    check_dns=True,
                                    dns_timeout=10,
                                    check_smtp=True,
                                    smtp_timeout=10,
                                    smtp_helo_host='my.host.name',
                                    smtp_from_address='my@from.addr.ess',
                                    smtp_skip_tls=False,
                                    smtp_tls_context=None,
                                    smtp_debug=False) 

    if is_valid_email == False:
        return '"invalid email"'
    elif option_type == 'fixed':
        if coverage_requested.isdigit() == False:
            return '"invalid coverage"'
    
    new_app = crud.create_application(form_inputs)

    new_app_id = new_app.application_id

    # for making the pdf:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size = 20)
    pdf.cell(200, 10, txt=f'Shepherd {option_type} Application Form', ln = 0, align = 'C')
    pdf.cell(200, 10, txt='', ln = 1, align = 'C')
    pdf.cell(200, 10, txt='', ln = 2, align = 'C')
    pdf.set_font("Arial", size = 15)
    line_no = 3
    
    # prints out a new line for each field in form_inputs

    for app in applications.application_options:
        if app['type'] == option_type:
            fields = app['fields']

    for field in fields:
        text = f'{field["label"]}: {form_inputs[field["name"]]}'
        pdf.cell(200, 10, txt=text, ln = line_no, align = 'L')
        line_no += 1
        print(f'pdf txt is this: {text}')
    
    pdf.output(f'application{new_app_id}.pdf')
    pdf_name = f"application{new_app_id}.pdf"

    return jsonify(pdf_name)

@app.route('/cookie')
def valid_auth_cookie():
    """Determines if valid auth cookie exists."""

    # default invalid_cookie to true
    invalid_cookie = True

    if 'auth' in request.cookies:
        if request.cookies.get('auth') == 'shepherd':
            invalid_cookie = False

    return jsonify(invalid_cookie)

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
