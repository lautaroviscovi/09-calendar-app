import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from '../ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { messages } from '../../helpers/calendar-messages';

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // Lectura de los eventos (se muestra en el calendario)
    const { events, activeEvent } = useSelector( state => state.calendar );

    const [ lastView, setlastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    // Trae los datos de la agenda
    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    }
    // Selecciona el evento y lo marca como activo en el state
    const onSelectEvent = ( e ) => {
        dispatch( eventSetActive( e ) );
    }
    // Muestra la vista (dia, semana, mes, año)
    // El localStorage mantiene el estado
    // Si estoy en semana y recargo, debe continuar
    // en semana y no cambiar a dia, por ejemplo
    const onViewChange = ( e ) => {
        setlastView( e );
        localStorage.setItem( 'lastView', e );
    }
    // Desactiva la nota seleccionada previamente
    const onSelectSlot = ( e ) => {
        dispatch( eventClearActiveEvent() );
    }
    // Pack de estilos para el evento
    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    };

    return (
        <div className = 'calendar-screen'>
            <NavBar />

            <Calendar
                localizer = { localizer }
                events = { events }
                startAccessor = 'start'
                endAccessor = 'end'
                messages = { messages }
                eventPropGetter = { eventStyleGetter }
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent = { onSelectEvent }
                onSelectSlot = { onSelectSlot }
                selectable = { true }
                onView = { onViewChange }
                view = { lastView }
                components = { {
                    event: CalendarEvent
                } }
            />

            <AddNewFab />
            
            {
                
                ( activeEvent ) && <DeleteEventFab />

            }

            <CalendarModal />

        </div>
    )
}; 