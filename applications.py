application_options = [
    {
        'type': 'Fixed',
        'fields': [
            {
                'label': 'Company Name',
                'datatype': 'str',
                'form input': 'input',
                'name': 'company_name'
            },
            {
                'label': 'Contact Email',
                'datatype': 'str',
                'form input': 'input',
                'name': 'contact_email'
            },
            {
                'label': 'Coverage Requested',
                'datatype': 'str',
                'form input': 'input',
                'name': 'coverage_requested'
            }
        ]
    },
    {
        'type': 'Flexible',
        'fields': [
            {
                'label': 'Company Name',
                'datatype': 'str',
                'form input': 'input',
                'name': 'company_name'
            },
            {
                'label': 'Contact Email',
                'datatype': 'str',
                'form input': 'input',
                'name': 'contact_email'
            },
            {
                'label': 'Project Type',
                'datatype': 'str',
                'form input': 'select',
                'options': ['Residential', 'Public', 'Commercial'],
                'name': 'project_type'
            }
        ]
    },
]