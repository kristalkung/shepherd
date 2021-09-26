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

@app.route('/application/fixed')
@app.route('/application/flexible')
@app.route('/application')
@app.route('/')
def homepage():
    """View homepage."""

    return render_template('root.html')

@app.route('/api/application/<option_type>/', methods=['GET'])
def application_type(option_type):
    """Returns the application form based on the option chosen."""

    fields = None

    for application_option in applications.application_options:
        if application_option['type'] == option_type:
            fields = application_option['fields']
    
    return jsonify(fields)

@app.route('/submission', methods=['POST'])
def validate_submission():

    company_name = request.form.get('company-name')
    contact_email = request.form.get('email')
    coverage_requested = request.form.get('coverage')
    project_type = request.form.get('project-type')

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
        return 'invalid email'
    elif coverage_requested != None:
        if coverage_requested.isdigit() == False:
            return 'invalid coverage'

    # pdf = FPDF()
    # pdf.add_page()
    # pdf.set_font("Arial", size = 15)

    if coverage_requested == None:
        flexible_app = crud.create_flexible_option(company_name, contact_email, project_type)
        new_app = crud.create_flexible_application(flexible_app)

        form_fields = {'Company Name': company_name,
                       'Contact Email': contact_email,
                       'Project Type': project_type}

        # for key in form_fields.keys():
            # pdf.cell()

    else:
        fixed_app = crud.create_fixed_option(company_name, contact_email, coverage_requested)
        new_app = crud.create_fixed_application(fixed_app)

        form_fields = {'Company Name': company_name,
                       'Contact Email': contact_email,
                       'Coverage Requested': coverage_requested}

    

    return 'valid'




@app.route('/cookie')
def valid_auth_cookie():
    """Determines if valid auth cookie exists."""

    invalid_cookie = True

    if 'auth' in request.cookies:
        if request.cookies.get('auth') == 'shepherd':
            invalid_cookie = False

    return jsonify(invalid_cookie)



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
