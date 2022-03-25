import { React, useState } from "react";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Groce'Inflation.css";
import { Title } from "./nav/Title";
import "./nav/Title.css"
import { SideDrawer } from "./newNav/sideDrawer/SideDrawer";
import { Backdrop } from "./newNav/sideDrawer/backdrop/Backdrop";
import { Navbar } from "./newNav/NewNavbar";

export const Groce = () => {
    
  const [isOpen, setIsOpen] = useState(true)
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
               <div style={{height: '100%'}}>
                 {/* passing a reference to the toggle function with props to navbar */}
                <Navbar drawerClickHandler={DrawerTogglerHandler} />
                <SideDrawer show={sideDrawerOpen} />
                {backdrop}
                </div>
                <div style={{marginTop: '64px'}}>
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
      {/* <Title /> */}
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>)
};