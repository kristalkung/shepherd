const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const useHistory = ReactRouterDOM.useHistory;
const Switch = ReactRouterDOM.Switch;


function App() {

  

  return (
    <div id='root'>
      <Router>
        <div>
          <ul>
            <li>
              <Link to='/'> Homepage </Link>
            </li>
            <li>
              <Link to='/option-one'> Option 1 </Link>
            </li>
            <li>
              <Link to='/option-two'> Option 2 </Link>
            </li>
          </ul>
        </div>
        <Switch>
          {/* <Route path='/option-one'> <OptionOne/> </Route>
          <Route path='/option-two'> <OptionTwo/> </Route> */}
          <Route path='/'> <Homepage/> </Route>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
