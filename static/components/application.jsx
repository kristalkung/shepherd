"use strict";

function Application() {

  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [coverage, setCoverage] = React.useState("");
  const [projectType, setProjectType] = React.useState("");
  const [fields, setFields] = React.useState(null);

  const option_type = location.pathname.slice(13);

  React.useEffect(() => {
    const options = {
      method: 'GET'
    };
    
    fetch(`/api/application/${option_type}`, options)
    // .then(response => console.log(response))
    .then(response => response.json())
    .then(data => setFields(data))
    // .catch(error => {
    //   console.error('error', error);
    // })
  }, [option_type])
    
  // console.log(`fields: ${fields}`)

  if (fields === null) {
    return <div>fields is null</div>
  } else {
    return (
      <form action='/submission'>
        <h2>Application for {option_type} Option</h2>
        <div>
          {fields.company_name}:
          <input type='text' value={companyName} name='company-name' onChange={(e)=>setCompanyName(e.target.value)} /> 
        </div>
        <div>
          {fields.contact_email}: 
          <input type='text' value={email} name='email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>        

        {fields.coverage_requested && 
        <div>
          {fields.coverage_requested}:
          <input type='text' value={coverage} name='coverage' onChange={(e)=>setCoverage(e.target.value)} /> 
        </div>
        }

        {fields.project_type && 
        <div>
          {fields.project_type}:
          <input type='text' value={coverage} name='project' onChange={(e)=>setProjectType(e.target.value)} /> 
        </div>
        }
        <button type='submit'>Submit</button>
      </form>
    )
  }
  }
  



