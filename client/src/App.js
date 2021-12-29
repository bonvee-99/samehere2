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
// REDUX:
import { useSelector, useDispatch } from "react-redux";
import { isAuth } from "./feature/authenticationSlice";

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.authentication.value);

  async function checkAuth() {
    const resultAction = await dispatch(isAuth());
    if (!isAuth.fulfilled.match(resultAction)) {
      console.error(resultAction.payload);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return isAuthenticated ? (
                <Redirect to="/main" />
              ) : (
                <Login {...props} />
              );
            }}
          />

          <Route
            path="/register"
            render={(props) => {
              return isAuthenticated ? (
                <Redirect to="/main" />
              ) : (
                <Register {...props} />
              );
            }}
          />

          <Route
            path="/main"
            render={(props) => {
              return isAuthenticated ? (
                <Home {...props} />
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

          <Route
            path="/"
            render={(props) => {
              return isAuthenticated ? (
                <Redirect to="/main" />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
