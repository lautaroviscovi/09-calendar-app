const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Todas las peticiones que no requieren el token
 * pasan por ésta función que va a seleccionar
 * si estamos en ambiente de desarrollo o producción
 * y va a convertir en string toda la data que llegue
 * desde la DB
 */
export const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`; // localhost:4000/api/auth localhost:4000/api/events

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        } )
    }
};
/**
 * Todas las peticiones que requieren el token
 * pasan por ésta función que va a seleccionar
 * si estamos en ambiente de desarrollo o producción
 * * y va a convertir en string toda la data que llegue
 * desde la DB
 */
export const fetchWithToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`; // localhost:4000/api/auth/new
    const token = localStorage.getItem( 'token' ) || '';

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        } );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        } )
    }
};