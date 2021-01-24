import moment from 'moment';

/**
 * Como las fechas de los eventos vienen
 * en formato de string, acá se mapean y
 * reconvierten en fechas para que el
 * calendario pueda leerlas y mostrarlas
 * en pantalla.
 */
export const prepareEvents = ( events = [] ) => {

    return events.map(
        ( e ) => ( {
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start ).toDate()
        } )
    )
}