"use strict";

// single component for displaying application form for both fixed and flexible options
function Application() {

  let history = useHistory();

  // states for input user for each field
  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [coverage, setCoverage] = React.useState("");
  const [projectType, setProjectType] = React.useState("Residential");

  // to hold what fields to eventually display inputs for on the form
  const [fields, setFields] = React.useState(null);

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
    .then(data => setFields(data))
  }, [option_type])

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

    // data is sent to server
    const data = {
      option_type,
      companyName,
      email,
      coverage,
      projectType
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

  // will display form based off of which fields there are
  if (fields === null) {
    return <div>fields is null</div>
  } else {
    return (
      <div className='app-form'>
        <form action='/submission' method='POST' >
          <h3 className='text-header'>Application for {option_type} option</h3>
          <div className='form-group text'>
            <label htmlFor="companyname" > {fields.company_name} </label>
            <input className='form-control' type='text' value={companyName} name='company-name' onChange={(e)=>setCompanyName(e.target.value)} autoComplete='off' required/> 
          </div>
          <div className='form-group text'>
            
            <label htmlFor="email" > {fields.contact_email}  </label>
            <input className='form-control' type='text' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} autoComplete='off' required/>
          </div>        

          {fields.coverage_requested && 
          <div className='form-group text'>
            <label htmlFor="coverage" > {fields.coverage_requested}</label>
            <input className='form-control' type='text' value={coverage} name='coverage' onChange={(e)=>setCoverage(e.target.value)} autoComplete='off' required/> 
          </div>
          }

          {fields.project_type && 
          <div className='form-group text'>
            <label htmlFor="projecttype"> {fields.project_type}</label>
            <select className='form-control text' value={projectType} name='project-type' onChange={(e)=>setProjectType(e.target.value)} autoComplete='off' required>
              <option value='Residential'>Residential</option>
              <option value='Commercial'>Commercial</option>
              <option value='Public'>Public</option>
            </select> 
          </div>
          }
          <div className='submit-button'>
            <button className='btn btn-warning' type='submit' disabled={disableSubmit} onClick={handleSubmit}>Submit</button>
          </div>
          
        </form>
      </div>
      
    )
  }
  }
  



