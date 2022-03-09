// This module will dsiplay a list of vendors
// AND this module will have a vendor pop-up window for editing a vendor
// This module will have a Add Vendor button that takes user to vendor form page

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/";

export const VendorList = () => {
    return (
        <>
            {
                <p key={1}>This is the Vendor page, it will display a list of vendors.</p>
            }
        </>
    )
}