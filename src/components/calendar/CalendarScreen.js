import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from '../ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch } from 'react-redux';

const localizer = momentLocalizer( moment );

const events = [ {
    title: 'Test event',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    notes: 'add',
    user: {
        _id: '123',
        name: 'Elon'
    }
} ]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const [ lastView, setlastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    // Trae los datos de la agenda
    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    }
    // Selecciona el evento
    const onSelectEvent = ( e ) => {
        console.log(e)
    }
    // Muestra la vista (dia, semana, mes, año)
    // El localStorage mantiene el estado
    // Si estoy en semana y recargo, debe continuar
    // en semana y no cambiar a dia, por ejemplo
    const onViewChange = ( e ) => {
        setlastView( e );
        localStorage.setItem( 'lastView', e );
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
                eventPropGetter = { eventStyleGetter }
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent = { onSelectEvent }
                onView = { onViewChange }
                view = { lastView }
                components = { {
                    event: CalendarEvent
                } }
            />

            <CalendarModal />

        </div>
    )
}; 