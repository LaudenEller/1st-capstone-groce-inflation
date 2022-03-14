import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom/";

// Return a input field for products the vendor will offer
// Return a plus sign or button that allows the user to add more product input fields to the vendor form
// Return a minus sign that allows the user to remove one of the product input fields on the vendor form

export const VendorProducts = () => {
    const [productList, setProductList] = useState([
        { product: "" },
        { product: "" }
    ])

const handleProductAdd = () => {
    setProductList([...productList, { product: "" }])
}

const handleProductRemove = (index) => {
const list = [...productList]
list.splice(index, 1)
setProductList(list)
}

const handleProductChange = (e, index) => {
    const {name, value} = e.target
    const list = [...productList]
    list[index][name] = value
    setProductList(list)
}

    return (
            <div className="form-field">
                <label htmlFor="vendorProduct">Product</label>
                {productList.map((product, index) => (
                    <div key = {index} className="vendorProducts">
                        <div className="first-division">
                            <input name="product" type="text" id="product" required 
                            value={product.product}
                            onChange = {(e) => handleProductChange(e, index)}/>
                                {productList.length > 1 && (
                                <button type="button" className="remove-btn"
                                onClick={() => handleProductRemove(index)}>
                                    <span>-</span>
                                </button>
                                )}
                        <div className="second-division">
                            {productList.length - 1 === index && productList.length < 10 &&
                            (
                            <button type="button" className="add-btn"
                            onClick={handleProductAdd}>
                                <span>+</span>
                            </button>
                            )}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
    )
}