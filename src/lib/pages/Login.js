import React, { useState } from 'react';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom'
import SecureHeader from '../components/SecureHeader'
import { loginAsync, setCredential } from '../../service/redux/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { useDispatch } from 'react-redux';
import {BiMessageAltError} from 'react-icons/bi'

const Login = () => {

    const [loginLoading, setLoginLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    document.title = 'Login'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setErrMsg('')
        const { email, password } = formData

        try {
            const resultAction = await dispatch(loginAsync({ email, password }));

            if (loginAsync.fulfilled.match(resultAction)) {
                const userData = resultAction.payload;
                dispatch(setCredential(userData));;
                nav("/");
            } else if (loginAsync.rejected.match(resultAction)) {
                setErrMsg(resultAction.error.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            setErrMsg("An error occurred during login.");
        } finally {
            setLoginLoading(false);
        }
    };

    const nav = useNavigate()
    function handleSignupBtn() {
        nav('/signup')
    }

    if (loginLoading) return <LoadingSpinner />

    return (


        <div className='sign-page'>
            <SecureHeader title='Log In' />
            <div className='signup-container'>
                <div className="signup-form">
                    <div className='signup-form-box'>

                        {errMsg &&
                            <div className='error-text'>
                                <BiMessageAltError/>
                                <text>{errMsg}</text>
                            </div>
                        }

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <button className='text-button sign-button' type="submit">Login</button>
                        </form>
                        <div className='sign-switch-title'>
                            New to BuyIt ?
                        </div>
                        <button onClick={handleSignupBtn} className='sign-switch-button'>Create account</button>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Login;
