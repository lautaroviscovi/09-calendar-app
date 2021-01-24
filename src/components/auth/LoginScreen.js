import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginvalues, handleLoginInputChange ] = useForm( {
        lEmail: 'elon@spacex.com',
        lPassword: '123456'
    } );

    const [ formRegistervalues, handleRegisterInputChange ] = useForm( {
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2: ''
    } );

    const { lEmail, lPassword } = formLoginvalues;

    const { rName, rEmail, rPassword, rPassword2 } = formRegistervalues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    };

    const handleRegister = ( e ) => {
        e.preventDefault();
        dispatch( startRegister( rName, rEmail, rPassword ) );

        if ( rPassword !== rPassword2 ) {
            return Swal.fire('Error', 'Passwords must be the same', 'error');
        }
    };


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
                                placeholder="elon@spacex.com"
                                name = 'lEmail'
                                value = { lEmail }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="******"
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
                                placeholder="Elon Musk"
                                name = 'rName'
                                value = { rName }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="elon@spacex.com"
                                name = 'rEmail'
                                value = { rEmail }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="******" 
                                name = 'rPassword'
                                value = { rPassword }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="******" 
                                name = 'rPassword2'
                                value = { rPassword2 }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};