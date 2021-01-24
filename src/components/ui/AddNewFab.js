import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();
    /**
     * El botón abre el modal
     * para crear un nuevo evento
     */
    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }


    return (
        <button 
        className = 'btn btn-primary fab'
        onClick = { handleClickNew }
        >
            <i className = 'fas fa-plus'></i>
        </button >
    )
};