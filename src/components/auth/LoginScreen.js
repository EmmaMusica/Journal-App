import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
// import validator from "validator";
// import { removeError, setError } from '../../actions/ui'

export const LoginScreen = () => {


    const dispatch = useDispatch()
    const {ui} = useSelector(state => state)
    const {msgError, loading} = ui

    const [values, handleInputChange] = useForm({
        email:'emanuel@emanuel.com',
        password: '123asd'
    })

    const {email, password} = values

    const handleLogin = (e) => {
        e.preventDefault();
        // if(isFormValid()){
            dispatch( startLoginEmailPassword(email, password))
        // }
    }

    const handleGoogleLogin = () => {
        // if(isFormValid()){
            dispatch( startGoogleLogin() )
        // }
    }

    // const isFormValid = () => {
    //     if(!validator.isEmail(email)){
    //         dispatch( setError('Email is not valid') )
    //         return false
    //     }
    //     else if(password.length <6 || password.length >6) {
    //         dispatch( setError('Password is not valid'))
    //         return false
    //     }
    //     else{
    //         dispatch( removeError() )
    //         return true
    //     }
    // }


    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>

            {/* {
                (msgError) 
                &&
                <div className="auth__alert-error">
                    {msgError}
                </div>
            } */}

            <form 
                onSubmit={ handleLogin }
                className="animate__animated animate__fadeIn animate_faster"    
            >
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    className="auth__input"
                    value={ password }
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                <hr className="mt-5"/>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account
                </Link>
            </form>

        </>
    )
}
