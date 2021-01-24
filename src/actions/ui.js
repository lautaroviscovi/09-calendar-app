import { types } from "../types/types";

/**
 * Acción para abrir el modal
 */
export const uiOpenModal = () => ( {
    type: types.uiOpenModal
} );

/**
 * Acción para cerrar el modal
 */
export const uiCloseModal = () => ( { 
    type: types.uiCloseModal
 } );