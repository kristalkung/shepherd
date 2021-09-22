const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;
const useParams = ReactRouterDOM.useParams;

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
              <Link to='/option-fixed'> Fixed Coverage </Link>
            </li>
            <li>
              <Link to='/option-flexible'> Flexible Coverage </Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path='/option-fixed'> <OptionFixed/> </Route>
          <Route path='/option-flexible'> <OptionFlexible/> </Route>
          <Route path='/'> <Homepage/> </Route>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
