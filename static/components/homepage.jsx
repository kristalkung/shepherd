function Homepage() {
  const handleOptionOne= () => {
    history.go('/option-one')
  }   
  const handleOptionTwo= () => {
    history.go('/option-two')
  }
  
  return (
    <div id='root'> 
      <h2>Hi Broker, welcome to homepage!</h2>
      <div>
        <div id='option-one'>
          place button here for option 1: 
          <button type='submit' onClick={handleOptionOne}>Option 1</button>
        </div>
        <div id='option-two'>
        place button here for option 2: 
        <button type='submit' onClick={handleOptionTwo}>Option 2</button>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Homepage />, document.getElementById('root'))
