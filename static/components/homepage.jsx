"use strict";

// const Link = ReactRouterDOM.Link;


function Homepage() {
  
  return (
    <div> 
      <h2>Hi Broker, welcome to homepage!</h2>
      <div>
        <div id='option-fixed'>
          Fixed Coverage Application: 
          <Link to='/application/fixed' type='submit' value='fixed' name='option' >Fixed</Link>
        </div>
        <div id='option-flexible'>
          Flexible Coverage Application: 
          <Link to='/application/flexible' type='submit' value='flexible' name='option'>Flexible</Link>
        </div>
      </div>
    </div>
  )
}
