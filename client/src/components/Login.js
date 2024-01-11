import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./mix.css";
import { LoginContext } from './ContextProvider/Context'; // Make sure to import the context

const Login = () => {
    const { setLoginData } = useContext(LoginContext); // Get the setLoginData function from context
    const [passShow, setPassShow] = useState(false);
    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });
    const history = useNavigate();

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            // ... (your existing code for validation)
        } else {
            const data = await fetch("https://naresh-8neg.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const res = await data.json();

            if (res.status === 201) {
                localStorage.setItem("usersdatatoken", res.result.token);
                setLoginData(true); // Update the login state
                window.location = "/dash";
                setInpval({ ...inpval, email: "", password: "" });
            }
        }
    };


    return (
        <>
            <section>
                <div className="form_data bg-gray-100">
                    <div className="form_heading">
                        <h1 className=''>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/">Sign Up</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login