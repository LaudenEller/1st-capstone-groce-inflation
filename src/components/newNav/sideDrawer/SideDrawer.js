import React from "react";
import "./SideDrawer.css"

export const SideDrawer = props => {
   
    // <nav className is either option a, or b, 
        // which could be many classes when utilizing []s and .join()
    let drawerClasses = 'sidedrawer'
    if (props.show) {
        drawerClasses = 'sidedrawer open'
    }
   
   return ( <nav className={drawerClasses}>
        <div className="sidedrawer-title">
            Vendors
        </div>
        
        <ul>
            <li><a href="#">vendor.name</a></li>
        </ul>
    </nav>
)}