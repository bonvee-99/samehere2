import { useState, useEffect } from "react";
import "./App.css"; // localish?
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/home/Home";
import Browse from "./components/home/Browse";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verified", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
    setIsAuthenticated(false);
  }); // we want this to happen on load as well as anytime isAuthenticated changes

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return <Welcome {...props} />;
            }}
          />

          <Route
            path="/login"
            render={(props) => {
              return isAuthenticated ? (
                <Redirect to="/home" />
              ) : (
                <Login {...props} setAuth={setAuth} />
              );
            }}
          />
          <Route
            path="/register"
            render={(props) => {
              return isAuthenticated ? (
                <Redirect to="/home" />
              ) : (
                <Register {...props} setAuth={setAuth} />
              );
            }}
          />

          <Route
            path="/home"
            render={(props) => {
              return isAuthenticated ? (
                <Home {...props} />
              ) : (
                <Redirect to="/browse" />
              );
            }}
          />

          <Route
            path="/browse"
            render={(props) => {
              return !isAuthenticated ? (
                <Browse {...props} />
              ) : (
                <Redirect to="/home" />
              );
            }}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
