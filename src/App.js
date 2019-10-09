import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signin from "./component/js/signin";
import Login from "./component/js/login";
import Main from "./component/js/main";

function App() {
  return (
    <Router>
      <Route path='/' component={Signin} exact></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/main' component={Main}></Route>
    </Router>
  );
}

export default App;
