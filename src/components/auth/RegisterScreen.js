import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

import validator from "validator";
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()

    //con useSelector utilizamos una parte del state del store;
    const {ui} = useSelector(state => state)

    const { msgError } = ui


    const [values, handleInputChange] = useForm({
        name: 'Emanuel',
        email: 'emanuel@emanuel.com',
        password: '123asd',
        password2: '123asd'
    })

    const {name, email, password, password2} = values

    const handleRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }

    }

    const isFormValid = () => {
        
        if(name.trim().length === 0){
            dispatch( setError('Name is requerid') )
            return false
        }else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') )
            return false
        }else if ( password !== password2 || password.lenght <5 ) {
            dispatch( setError('The passwords should be at least 6 characters and match each other') )
            return false
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>

            <h3 className="auth__title mb-5">Register</h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate_faster"    
            >
                
                {
                    (msgError) 
                    
                    &&

                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    className="auth__input"
                    value={name}
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    autoComplete="off"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-1 mt-1"
                >
                    Register
                </button>
                <div className="auth__social-networks">
                    <p>Register with social networks</p>
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>


                <Link to="/auth/login" className="link">
                    Alredy register?
                </Link>
            </form>

        </>
    )
}
