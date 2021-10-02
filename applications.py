application_options = [
    {
        'type': 'Fixed',
        'fields': [
            {
                'name': 'Company Name',
                'datatype': 'str',
                'form input': 'input'
            },
            {
                'name': 'Contact Email',
                'datatype': 'str',
                'form input': 'input'
            },
            {
                'name': 'Coverage_requested',
                'datatype': 'str',
                'form input': 'input',
            }
        ]
    },
    {
        'type': 'Flexible',
        'fields': [
            {
                'name': 'Company Name',
                'datatype': 'str',
                'form input': 'input'
            },
            {
                'name': 'Contact Email',
                'datatype': 'str',
                'form input': 'input'
            },
            {
                'name': 'Project Type',
                'datatype': 'str',
                'form input': 'select',
                'options': ['Residential', 'Public', 'Commercial']
            }
        ]
    },
]