application_options = [
    {
        'type': 'Fixed',
        'fields': [
            {'company_name': {
                'name': 'Company Name',
                'datatype': 'str',
                'form input': 'input'
            }},
            {'contact_email': {
                'name': 'Contact Email',
                'datatype': 'str',
                'form input': 'input'
            }},
            {'coverage_requested': {
                'name': 'Coverage_requested',
                'datatype': 'str',
                'form input': 'input',
            }}
        ]
    },
    {
        'type': 'Flexible',
        'fields': [
            {'company_name': {
                'name': 'Company Name',
                'datatype': 'str',
                'form input': 'input'
            }},
            {'contact_email': {
                'name': 'Contact Email',
                'datatype': 'str',
                'form input': 'input'
            }},
            {'project_type': {
                'name': 'Project Type',
                'datatype': 'str',
                'form input': 'select',
                'options': ['Residential', 'Public', 'Commercial']
            }}
        ]
    },
]