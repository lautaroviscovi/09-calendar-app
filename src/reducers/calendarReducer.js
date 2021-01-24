import { types } from '../types/types';

/*

{
            _id: '1234567890asdfghjkl',
            title: 'Test event',
            start: moment().toDate(),
            end: moment().add( 2, 'hours' ).toDate(),
            notes: 'Starlink',
            user: {
                _id: '1234567890qwertyuiop',
                name: 'Elon Musk'
            } 
    } 

*/

const initialState = {
    events: [ ],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {


    switch ( action.type ) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    // Devuelvo el id del nuevo evento, sino devuelvo el evento 
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    // Filtro el evento y si es diferente
                    // al evento del estado lo devuelve
                    // Por ultimo declara el activeEvent como null
                    e => ( e.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            }

        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
};