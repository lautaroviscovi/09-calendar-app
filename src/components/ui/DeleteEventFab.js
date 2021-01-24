import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    /**
     * Con un evento seleccionado y con su estado activo,
     * aparece el botón 'delete' que nos permite eliminarlo.
     */
    const handleDelete = () => {
        dispatch( eventStartDelete() );
    }

    return (
        <button 
            className = 'btn btn-danger fab-danger'
            onClick = { handleDelete }
            >
            <i className = 'fas fa-trash'>
            </i>
            <span> Delete event </span>
        </button>
    )
};