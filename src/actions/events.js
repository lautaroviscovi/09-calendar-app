import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

/**
 * Acción para crear un nuevo evento, toma el uid y name
 * del usuario validado. Si todo es correcto,
 * retorna el nuevo evento y retorna el id, uid, name
 * y llama al eventAddNew para guardarlo
 */
export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {
        
        const { uid, name } = getState().auth;

        try {
            
            const response = await fetchWithToken( 'events', event, 'POST');
            const body = await response.json();

            if ( body.Ok ) {
                event.id = body.event.id;
            
                event.user = {
                    _id: uid,
                    name: name
                }
                
                dispatch( eventAddNew() );
            }

        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * Al hacer click en un evento, cambia el estado a activo
 */
export const eventSetActive = ( event ) => ( {
    type: types.eventSetActive,
    payload: event
} );

/**
 * Al hacer click fuera de un evento, el estado cambia a inactivo
 */
export const eventClearActiveEvent = () => ( {
    type: types.eventClearActiveEvent
} );

/**
 * Toma un evento seleccionado por id y despacha la
 * acción para actualizarlo y guardalo
 */
export const eventStartUpdate = ( event ) => {
    return async ( dispatch ) => {

        try {

            const response = await fetchWithToken( `events/${ event.id }`, event, 'PUT');
            const body = await response.json();

            if ( body.Ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
};

/**
 * Toma un evento activo pasado o futuro por id y lo elimina de la base de datos. 
 */
export const eventStartDelete = ( event ) => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        const response = await fetchWithToken( `events/${ id }`, {}, 'DELETE');
        const body = await response.json();

        if ( body.Ok ) {
            dispatch( eventDeleted() );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

/**
 * La acción hace una petición de los eventos que son previaamente
 * mapeados y formateados para finalmente mostrarlos en el calendario
 */
export const eventStartLoading = () => {
    return async ( dispatch ) => {
        
        try {
            
            const response = await fetchWithToken( 'events' );
            const body = await response.json();

            const events = prepareEvents( body.events );

            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error)
        }
    }
};

/**
 * Dispara la acción para salir de la sesión de usuario
 */
export const eventLogout = () => ( {
    type: types.eventLogout
} )

const eventAddNew = ( event ) => ( {
    type: types.eventAddNew,
    payload: event
} );

const eventLoaded = ( events ) => ( { 
    type: types.eventLoaded,
    payload: events
 } )
 
 const eventUpdated = ( event ) => ( {
     type: types.eventUpdated,
     payload: event
 } );

 const eventDeleted = () => ( {
    type: types.eventDeleted
} );