"use strict";

// const Link = ReactRouterDOM.Link;


function Homepage() {
  
  return (
    <div className='homepage'> 
      <h2 className='text-header'>Hi. Click on an application option below</h2>
      <div className='app-options'>
        <div id='option-fixed'  className='text'>
          Fixed Coverage Application: 
          <Link className='app-link' to='/application/fixed' type='submit' value='fixed' name='option' >Fixed</Link>
        </div>
        <div id='option-flexible' className='text'>
          Flexible Coverage Application: 
          <Link className='app-link' to='/application/flexible' type='submit' value='flexible' name='option'>Flexible</Link>
        </div>
      </div>
    </div>
  )
}
