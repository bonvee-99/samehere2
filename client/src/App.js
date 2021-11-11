import { useState, useEffect } from "react";
import "./App.css"; // localish?
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/landing/Login";
import Register from "./components/landing/Register";
import Home from "./components/main/Home";
import Resources from "./components/help/Resources";

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
  }); // we want this to happen on load as well as anytime isAuthenticated changes

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
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
                <Home {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              );
            }}
          />

          <Route
            path="/resources"
            render={(props) => {
              return <Resources {...props} />;
            }}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
