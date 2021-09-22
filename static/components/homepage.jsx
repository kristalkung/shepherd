"use strict";

// const Link = ReactRouterDOM.Link;


function Homepage() {
  
  return (
    <div> 
      <h2>Hi Broker, welcome to homepage!</h2>
      <div>
        <div id='option-fixed'>
          Fixed Coverage Application: 
          {/* <button type='submit' onClick={handleOptionOne}>Option 1</button> */}
          <Link to='/option-fixed'>Fixed </Link>
        </div>
        <div id='option-flexible'>
          Flexible Coverage Application: 
          {/* <button type='submit' onClick={handleOptionTwo}>Option 2</button> */}
          <Link to='/option-flexible'> Flexible </Link>
        </div>
      </div>
    </div>
  )
}
