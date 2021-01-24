import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginvalues, handleLoginInputChange ] = useForm( {
        lEmail: 'elon@spacex.com',
        lPassword: '123456'
    } );

    const { lEmail, lPassword } = formLoginvalues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    }

    const handleRegister = ( e ) => {
        e.preventDefault();
        console.log( e )
    }


    return (

        <div className="login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Sign In</h3>
                    <form
                    onSubmit = { handleLogin }
                    >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="E-mail"
                                name = 'lEmail'
                                value = { lEmail }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name = 'lPassword'
                                value = { lPassword }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>




                <div className="col-md-6 login-form-2">
                    <h3>Sign Up</h3>
                    <form
                    onSubmit = { handleRegister }
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="E-mail"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password" 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};