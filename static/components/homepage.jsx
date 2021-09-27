"use strict";

// const Link = ReactRouterDOM.Link;


function Homepage() {
  
  return (
    <div className='homepage'> 
      <h2 className='text-header'>Click on an application option below</h2>
      <div className='app-options'>
        <div id='option-fixed'  className='text option-fixed'>
          
          <Link className='btn btn-warning' to='/application/fixed' type='submit' value='fixed' name='option' >Fixed Coverage Application </Link>
        </div>
        <div id='option-flexible' className='text'>
          
          <Link className='btn btn-warning' to='/application/flexible' type='submit' value='flexible' name='option'>Flexible Coverage Application</Link>
        </div>
      </div>
    </div>
  )
}
