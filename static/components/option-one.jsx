"use strict";
const CookiesProvider = ReactCookie.CookiesProvider;
const Cookies = ReactCookie.Cookies;

function OptionFixed() {

  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [coverage, setCoverage] = React.useState("");
  const [submitButton, setSubmitButton] = React.useState(false);

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // };

  // fetch('/cookie')
  // .then(res => {
  //   return res.json();
  // })
  // .then(data => {
  //   if (data == 'false') {
  //     setDisableSubmit(false)
  //     console.log('hi')
  //   }
  // })

  function HandleSubmit(e) {
    e.preventDefault();

    const cookies = document.cookie.split(';')

    const searchAuth = cookies.map((cookie) => {
      if (cookie == 'auth=shepherd') {
        setSubmitButton(true)
      }
    })

    if (submitButton) {
      console.log('shepherd auth')
    }
    else console.log('no auth')

  }

  return (
    <div>
      <h2>Fixed Coverage Application</h2>
      <form action='/api/option-fixed' method='POST'>
        <div>
          <label>Company Name: </label>
          <input type='text' value={companyName} name='company-name' onChange={(e)=>setCompanyName(e.target.value)} autoComplete='off' required></input>
        </div>
        <div>
          <label>Contact Email: </label>
          <input type='text' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} autoComplete='off' required></input>
        </div>
        <div>
          <label>Coverage Requested: </label>
          <input type='text' value={coverage} name='coverage' onChange={(e)=>setCoverage(e.target.value)} autoComplete='off' required></input>
        </div>
        <button type='submit' value={submitButton} onClick={HandleSubmit}>Submit</button>
      </form>
    </div>
  )
}
