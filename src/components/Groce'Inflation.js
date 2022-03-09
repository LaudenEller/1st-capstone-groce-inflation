import React from "react";
import { NavBar } from "./nav/NavBar";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Groce'Inflation.css";

export const Groce = () => (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("groce_user")) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );