import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("groce_user", exists.id)
                    history.push("/")
                } else {
                    history.push("/register")
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <header className="navbarLogin">
        <nav className="navbarLogin-navigation">
            <div className="spacer"></div>
            <div className="spacer"></div>
        </nav>

    </header>
                    <section className="main-container">
            <section className="login-container">
                {/* <form className="form--login" onSubmit={handleLogin}>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form> */}
                <Form inline className="form--login" onSubmit={handleLogin}>
                <FormGroup floating>
                <Input
                    required autoFocus
                    id="loginEmail"
                    name="loginEmail"
                    placeholder="Email Address"
                    type="email"
                    className="form-control"
                    // placeholder="Price eg. 9.99"
                    onChange={evt => set(evt.target.value)}
                />
                <Label className="loginEmail-label" htmlFor="inputEmail">Email Address </Label>
            </FormGroup>
            {/* Return a submit form button */}
            <Button className="btn btn-primary" type="submit">
                Sign In
            </Button>
            </Form>
            </section>
            </section>
        </main>
    )
}

