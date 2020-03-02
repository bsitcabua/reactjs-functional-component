import React, {Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Pages
const Login = React.lazy(() => import('./components/Pages/Login'));
const Register = React.lazy(() => import('./components/Pages/Register/Register'));
const Page404 = React.lazy(() => import('./components/Pages/Page404'));

function App() {

  return (
    <Router>
      <Suspense fallback={<div className="text-center text-muted">Loading...</div>}>
        <Switch>
          <Route exact path="/" render={props => <Login {...props}/>} />
          <Route exact path="/login" render={props => <Login {...props}/>} />
          <Route exact path="/register" render={props => <Register {...props}/>} />
          <Route path="*" component={Page404} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
