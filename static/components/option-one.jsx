"use strict";

function OptionOne() {

  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [coverage, setCoverage] = React.useState("");


  return (
    <div>
      <h2>Option 1</h2>
      <form action='/api/option-one' method='POST'>
        <div>
          <label>Company Name: </label>
          <input type='text' value={companyName} name='company-name' onChange={(e)=>setCompanyName(e.target.value)} required></input>
        </div>
        <div>
          <label>Contact Email: </label>
          <input type='text' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} required></input>
        </div>
        <div>
          <label>Project Name: </label>
          <input type='text' value={projectName} name='company-name' onChange={(e)=>setProjectName(e.target.value)} required></input>
        </div>
        <div>
          <label>Project Start Date: </label>
          <input type='text' value={startDate} name='company-name' onChange={(e)=>setStartDate(e.target.value)} required></input>
        </div>
        <div>
          <label>Expected End Date: </label>
          <input type='text' value={endDate} name='company-name' onChange={(e)=>setEndDate(e.target.value)} required></input>
        </div>
        <div>
          <label>Coverage Requested: </label>
          <input type='text' value={coverage} name='coverage' onChange={(e)=>setCoverage(e.target.value)} required></input>
        </div>
      </form>
    </div>
  )
}
