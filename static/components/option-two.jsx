"use strict";

function OptionFlexible() {

  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [projectType, setProjectType] = React.useState("");
  const [coverage, setCoverage] = React.useState("");
  const [submitButton, setSubmitButton] = React.useState(false);


  return (
    <div>
      <h2>Flexible Coverage Application</h2>
      <form action='/api/option-flexible' method='POST'>
        <div>
          <label>Company Name: </label>
          <input type='text' value={companyName} name='company-name' onChange={(e)=>setCompanyName(e.target.value)} autoComplete='off' required></input>
        </div>
        <div>
          <label>Contact Email: </label>
          <input type='text' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} autoComplete='off' required></input>
        </div>
        <div>
          <label>Project Name: </label>
          <input type='text' value={projectName} name='company-name' onChange={(e)=>setProjectName(e.target.value)} autoComplete='off' required></input>
        </div>
        <div>
          <label>Project Type: </label>
          <input type='text' value={projectType} name='project-type' onChange={(e)=>setProjectType(e.target.value)} autoComplete='off' required></input>
        </div>
        <div>
          <label>Coverage Requested: </label>
          <input type='text' value={coverage} name='coverage' onChange={(e)=>setCoverage(e.target.value)} autoComplete='off' required></input>
        </div>
        <button type='submit' value={submitButton} >Submit</button>
      </form>
    </div>
  )
}
