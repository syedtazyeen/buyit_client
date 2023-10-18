import React, { useState } from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import SecureHeader from '../components/SecureHeader'
import { signUpAsync, setCredential } from '../../service/redux/authSlice';
import LoadingSpinner from '../components/LoadingSpinner'
import {BiMessageAltError} from 'react-icons/bi'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loginLoading, setLoginLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    document.title = "Sign up"

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setErrMsg('')
        const { name, email, password } = formData

        try {
            const resultAction = await dispatch(signUpAsync({ name, email, password }))

            if (signUpAsync.fulfilled.match(resultAction)) {
                const userData = resultAction.payload;
                dispatch(setCredential(userData));
                nav("/");
            } else if (signUpAsync.rejected.match(resultAction)) {
                setErrMsg(resultAction.error.message);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setErrMsg("An error occurred during Signup.");
        } finally {
            setLoginLoading(false);
        }
    };

    const nav = useNavigate()
    function handleLoginBtn() {
        nav('/login')
    }

    if (loginLoading) return <LoadingSpinner />

    return (
        <div className='sign-page'>
            <SecureHeader title='Create Account' />
            <div className='signup-container'>
                <div className="signup-form">
                    <div className='signup-form-box'>

                        {errMsg &&
                            <div className='error-text'>
                                <BiMessageAltError />
                                <text>{errMsg}</text>
                            </div>
                        }

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <button className='text-button sign-button' type="submit">Create Account</button>
                        </form>
                        <div className='sign-switch-title'>
                            Already have an Account?
                        </div>
                        <button onClick={handleLoginBtn} className='sign-switch-button'>Login</button>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Signup;
