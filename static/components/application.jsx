"use strict";



function Application() {

  let history = useHistory();

  // to hold what fields to eventually display inputs for on the form
  const [fields, setFields] = React.useState(null);

  let field_dict = {}
  const [fieldsState, setFieldsState] = React.useState(null)

  // for determining if the submit button should be disabled or not
  const [disableSubmit, setDisableSubmit] = React.useState(true);

  // option_type will be either 'fixed' or 'flexible'
  const option_type = location.pathname.slice('/application/'.length);

  // useEffect & fetch will grab the option type and determine from server
  // & update setFields (which fields to display in the submission form)
  React.useEffect(() => {
    const options = {
      method: 'GET'
    };
    
    fetch(`/api/application/${option_type}`, options)
    .then(response => response.json())
    .then(data => {
      setFields(data)
      field_dict['option_type'] = option_type
      data.map((field) => (
        field_dict[field.name] = ''
      ))
      setFieldsState(field_dict)
      // console.log(field_dict)
    })
  }, [option_type])

  // console.log(fields)

  // useEffect & fetch will call server path '/cookie'
  // will determine if disableSubmit should be true or false
  React.useEffect(() => {

    fetch(`/cookie`)
    .then(response => response.json())
    .then(data => setDisableSubmit(data))

  }, [disableSubmit])


    // to handle form submission after clicking button
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(fieldsState)

    // data is sent to server
    const data = {
      fieldsState
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    // for determining if inputs are valid inputs
    fetch('/submission', options)
    .then(response => response.json())
    .then(data => {
      if ((data == 'invalid email') || (data == 'invalid coverage')) {
        alert('Email is invalid or coverage input is invalid. Please enter an existing email and only use numbers for coverage.')
      }
      else {
        return (
          history.push(`/form/${data}`)
        )
      }
    })

  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFieldsState(prevFieldsState => ({
      ...prevFieldsState,
      [name]: value
    }));
  }

  // will display form based off of which fields there are
  if (fieldsState === null) {
    return <div>fieldsState is null</div>
  } else {
    let form = fields.map((field, index) => {
      if (field['form input'] === 'input') {
        return (
          
          <div key={index} className='form-group text'> 
            <label htmlFor={field.name} > {field.label} </label>
            <input className='form-control' value={fieldsState[field.name]} type='text' onChange={handleChange} name={field.name} />
          </div>
        )
      }
      if (field['form input'] === 'select') {
        return (
          <div key={index} className='form-group text'> 
            <label htmlFor={field.name} > {field.label} </label>
            <select className='form-control text' value={fieldsState[field.name]} name={field.name} onChange={handleChange} autoComplete='off' required>
              <option value='Residential'>Residential</option>
              <option value='Commercial'>Commercial</option>
              <option value='Public'>Public</option>
            </select> 
          </div>
        )}
        
    });

    return (
      <div className='app-form'>
        <form action='/submission' method='POST'>
          <h3 className='text-header'>Application for {option_type} Option</h3>
          
          {form}
          <div className='submit-button'>
            <button className='btn btn-warning' type='submit' disabled={disableSubmit} onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      
      </div>
    )

}
}