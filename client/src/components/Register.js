import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const history = useNavigate()

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval((prevInput) => ({
            ...prevInput,
            [name]: value
        }));

        // Clear error message when user starts typing
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        // Validate the form
        if (fname === "") {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                fname: "Name is required!"
            }));
        } else if (email === "") {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                email: "Email is required!"
            }));
        } else if (!email.includes("@")) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                email: "Include @ in your email!"
            }));
        } else if (password === "") {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                password: "Password is required!"
            }));
        } else if (password.length < 6) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                password: "Password must be 6 characters long!"
            }));
        } else if (cpassword === "") {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                cpassword: "Confirm password is required!"
            }));
        } else if (cpassword.length < 6) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                cpassword: "Confirm password must be 6 characters long!"
            }));
        } else if (password !== cpassword) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                cpassword: "Password and Confirm password do not match!"
            }));
        } else {
            // Clear all error messages
            setErrorMessages({
                fname: "",
                email: "",
                password: "",
                cpassword: ""
            });

            const data = await fetch("https://naresh-8neg.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();

            if (res.status === 201) {
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });

                history("/")
            } else if (res.status === 409) {
                toast.error("Email is already taken!", {
                    position: "top-center"
                });
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data bg-white">
                    <div className="form_heading">
                        <h1 className='text-black-900'>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will like it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                            {errorMessages.fname && <p className="error-message">{errorMessages.fname}</p>}
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                            {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                            {errorMessages.password && <p className="error-message">{errorMessages.password}</p>}
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                            {errorMessages.cpassword && <p className="error-message">{errorMessages.cpassword}</p>}
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register;
