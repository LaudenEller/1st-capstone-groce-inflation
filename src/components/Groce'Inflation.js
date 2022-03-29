import { React, useState } from "react";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Groce'Inflation.css";
import { SideDrawer } from "./nav/sideDrawer/SideDrawer";
import { Backdrop } from "./nav/sideDrawer/backdrop/Backdrop";
import { Navbar } from "./nav/Navbar";

export const Groce = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)

  const DrawerTogglerHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen)
  }

  const BackdropClickHandler = () => {
    setSideDrawerOpen(false)
  }

    let backdrop = null
if (sideDrawerOpen === true) {
  backdrop = <Backdrop click={BackdropClickHandler} />
}

  return (<>
  
  
  
      <Route
        render={() => {
          if (localStorage.getItem("groce_user")) {
            return (
              <>
               <div className="route-container">
                 {/* passing a reference to the toggle function with props to navbar */}
                <Navbar drawerClickHandler={DrawerTogglerHandler} />
                <SideDrawer show={sideDrawerOpen} />
                {backdrop}
                </div>
                <div className="content-area">
                <ApplicationViews />
                </div>
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
    </>)
};