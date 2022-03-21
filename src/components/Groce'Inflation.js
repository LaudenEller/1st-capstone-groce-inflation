import React from "react";
import { NavBar } from "./nav/NavBar";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Groce'Inflation.css";
import { Title } from "./nav/Title";

export const Groce = () => (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("groce_user")) {
            return (
              <>
                <NavBar />
                {/* <Title /> */}
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
      {/* <Title /> */}
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );