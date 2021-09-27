const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;
const useParams = ReactRouterDOM.useParams;
const CookiesProvider = ReactCookie.CookiesProvider;
const Cookies = ReactCookie.Cookies;


function App() {

  return (
    <CookiesProvider>
      <div id='root'>
        <Router>
          <nav id='navbar' className='navbar'>
            <a href='/'><img src="/static/img/shepherd-img.png" width="180" height="70" className="d-inline-block align-center" alt="" /> </a>
          </nav>
          <Switch>
            <Route path='/application/fixed'> <Application/> </Route>
            <Route path='/application/flexible'> <Application/> </Route>
            <Route path='/form/:application'> <PdfForm /> </Route>
            <Route path='/'> <Homepage/> </Route>
          </Switch>
        </Router>
      </div>
    </CookiesProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
