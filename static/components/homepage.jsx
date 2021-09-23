"use strict";

// const Link = ReactRouterDOM.Link;


function Homepage() {
  
  return (
    <div> 
      <h2>Hi Broker, welcome to homepage!</h2>
      <form action='/application' method='POST'>
        <div id='option-fixed'>
          Fixed Coverage Application: 
          <button type='submit' value='fixed' name='option'>Fixed</button>
          {/* <Link to='/option-fixed'>Fixed </Link> */}
        </div>
        <div id='option-flexible'>
          Flexible Coverage Application: 
          <button type='submit' value='flexible' name='option'>Flexible</button>
          {/* <Link to='/option-flexible'> Flexible </Link> */}
        </div>
      </form>
    </div>
  )
}
