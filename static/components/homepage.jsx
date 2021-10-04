"use strict";

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

