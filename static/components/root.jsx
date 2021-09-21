const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;

function App() {
  return (
    <div id='root'>
      welcome to homepage!

      <div>
        <div id='option-one'>
          place button here for option 1
        </div>
        <div id='option-two'>
        place button here for option 2
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
