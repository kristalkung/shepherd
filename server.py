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
    """Receives form data from applications.jsx and does the following:
        - validates email and coverage_requested (must be int)
        - adds form data to db
        - creates pdf of form data and saves to local"""

    option_type = request.json.get('option_type')
    company_name = request.json.get('companyName')
    contact_email = request.json.get('email')
    coverage_requested = request.json.get('coverage')
    project_type = request.json.get('projectType')
    
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
    
    if option_type == 'flexible':
        form_option = 'Flexible'
        flexible_app = crud.create_flexible_option(company_name, contact_email, project_type)
        new_app = crud.create_flexible_application(flexible_app)

        form_fields = {'Company Name': company_name,
                       'Contact Email': contact_email,
                       'Project Type': project_type}

    else:
        form_option = 'Fixed'
        fixed_app = crud.create_fixed_option(company_name, contact_email, coverage_requested)
        new_app = crud.create_fixed_application(fixed_app)
        
        form_fields = {'Company Name': company_name,
                       'Contact Email': contact_email,
                       'Coverage Requested': coverage_requested}

    new_app_id = new_app.application_id

    # for making the pdf:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size = 20)
    pdf.cell(200, 10, txt=f'Shepherd {form_option} Application Form', ln = 0, align = 'C')
    pdf.cell(200, 10, txt='', ln = 1, align = 'C')
    pdf.cell(200, 10, txt='', ln = 2, align = 'C')
    pdf.set_font("Arial", size = 15)
    line_no = 3
    
    # prints out a new line for each field in form_fields
    for key in form_fields.keys():
        text = f'{key}: {form_fields[key]}'
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

# TODO: complete show_pdf(data)
# @app.route('/form/<data>', methods=['GET'])
# def show_pdf(data):
#     """Displays PDF in browser after successful submission"""

#     url = f'/Users/kristalkung/vagrant/hb-dev/src/shepherd/takehome/{data}.pdf'
#     webbrowser.open(url,new=new)



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
