# Take home challenge for Shepherd

## Table of Contents

- [Technologies Used](https://github.com/kristalkung/shepherd#technologies-used)
- [How to Run Locally](https://github.com/kristalkung/shepherd#how-to-run-locally)
- [Features](https://github.com/kristalkung/shepherd#features)
- [Next Steps](https://github.com/kristalkung/shepherd#next-steps)

## Technologies Used

Python, Flask, SQLAlchemy, PostgreSQL, Javascript, React, HTML/CSS, Bootstrap

## How to run locally

- Clone this repository
- Install the requirements using: ```pip3 install -r requirements.txt```
- Create a virtual environment
- Initiate the database with: ```createdb brokers```
- And: ```python3.8 -i model.py```
- And: ```db.create_all()``` to create the tables. You may quit out of the interpreter after this
- Load the website using: ```python3.8 server.py```
- On the browser, search [localhost:5000/](localhost:5000/)

## Features

Homepage includes options for two different types of applications: fixed and flexible coverage. Fields for fixed coverage include company name, contact email, and coverage requested. For flexible coverage, the fields are company name, contact email, and product type.

On the application form page, the fields for the corresponding application type is displayed. Upon submission, the server will validate:

- Whether the email given is a valid email
- Whether the input for coverage requested are digits

If submission is successful, the server will generate a PDF file listing out the form data and save the PDF onto the local file.

## Next Steps

Next steps for this include displaying the PDF of the submitted form onto the browser.
