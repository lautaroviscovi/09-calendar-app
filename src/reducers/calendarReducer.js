import moment from 'moment';
import { types } from '../types/types';

const initialState = {
    events: [ {
            _id: new Date().getTime(),
            title: 'Test event',
            start: moment().toDate(),
            end: moment().add( 2, 'hours' ).toDate(),
            bgcolor: '#fafafa',
            notes: 'add',
            user: {
                _id: '123',
                name: 'Elon'
            } 
    } ],
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

        default:
            return state;
    }
};