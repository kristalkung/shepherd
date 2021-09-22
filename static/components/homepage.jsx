"use strict";

// const Link = ReactRouterDOM.Link;


function Homepage() {
  const handleOptionOne= () => {
    history.go('/option-one')
  }   
  const handleOptionTwo= () => {
    history.go('/option-two')
  }
  
  return (
    <div> 
      <h2>Hi Broker, welcome to homepage!</h2>
      <div>
        <div id='option-one'>
          place button here for option 1: 
          {/* <button type='submit' onClick={handleOptionOne}>Option 1</button> */}
          <Link to='/option-one'>Option 1 </Link>
        </div>
        <div id='option-two'>
          place button here for option 2: 
          {/* <button type='submit' onClick={handleOptionTwo}>Option 2</button> */}
          <Link to='/option-two'>Option 2 </Link>
        </div>
      </div>
    </div>
  )
}
