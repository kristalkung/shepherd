"use strict";

// const Link = ReactRouterDOM.Link;


function Homepage() {
  
  const [buttons, setButtons] = React.useState([])

  React.useEffect(() => {
    fetch('/buttons')
  .then(response => response.json())
  .then(data => setButtons(data))
  }, [setButtons])
  

  if (buttons) {
    return (
      <div className='homepage'> 
        <h2 className='text-header'>Click on an application option below</h2>
        <div className='app-options'>
          {buttons.map((button, index) => (
            <div id='option' key={index} className='text option-fixed'>
            <Link className='btn btn-warning' to={'/application/' + button} type='submit' value='fixed' name='option' > {button} Application Option</Link>
          </div>
          ))}
        </div>
      </div>
    )
  }
}


// function Homepage() {
  
//   return (
//     <div className='homepage'> 
//       <h2 className='text-header'>Click on an application option below</h2>
//       <div className='app-options'>
//         <div id='option-fixed'  className='text option-fixed'>
          
//           <Link className='btn btn-warning' to='/application/fixed' type='submit' value='fixed' name='option' >Fixed Coverage Application </Link>
//         </div>
//         <div id='option-flexible' className='text'>
          
//           <Link className='btn btn-warning' to='/application/flexible' type='submit' value='flexible' name='option'>Flexible Coverage Application</Link>
//         </div>
//       </div>
//     </div>
//   )
// }