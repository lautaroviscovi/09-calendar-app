import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const NavBar = () => {
    /**
     * Leo el nombre del usuario logueado
     * para mostrarlo en la barra de navegación
     */
    const { name } = useSelector(state => state.auth );

    const dispatch = useDispatch();
    /**
     * Cierre de la sesión activa
     */
    const handleLogout = ( e ) => {
        e.preventDefault();
        dispatch( startLogout() );
    }

    return (
        <div className = 'navbar navbar-dark bg-dark mb-4'>
            <span className = 'navbar-brand'>
                { name }
            </span>

            <button 
            className = 'btn btn-outline-danger'
            onClick = { handleLogout }
            >
                <i className = 'fas fa-sign-out-alt'></i>
                <span> Exit </span>
            </button>
            
        </div>
    )
};