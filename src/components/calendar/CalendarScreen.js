import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from '../ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { messages } from '../../helpers/calendar-messages';

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    /**
     * Lectura de los eventos del store para mostrar en el calendario
     */
    const { events, activeEvent } = useSelector( state => state.calendar );
    /**
     * Lectura del uid de usuario
     */
    const { uid } = useSelector( state => state.auth );
    /**
     * El localStora mantiene el último estado del calendario.
     * Si estaba en Semana y recargo, debe volver a Semana,
     * si algo falla, el estado se va a mantener en Mes.
     */
    const [ lastView, setlastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' );
    /**
     * El efecto está pendiente de los nuevos eventos
     * que se van guardando para mostrarlos en pantalla
     */
    useEffect( () => {
        
        dispatch( eventStartLoading() );

    }, [ dispatch ] );

    /**
     * El doble click sobre un evento abre el modal
     * para su lectura o edición
     */
    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    }
    /**
     * Selecciona el evento y lo marca como activo en el store
     */
    const onSelectEvent = ( e ) => {
        dispatch( eventSetActive( e ) );
    }
    /**
     * Muestra la vista (dia, semana, mes, año)
     * El localStorage mantiene el estado
     * Si estoy en semana y recargo, debe continuar
     * en semana y no cambiar a dia, por ejemplo
     */
    const onViewChange = ( e ) => {
        setlastView( e );
        localStorage.setItem( 'lastView', e );
    }
    /**
     * Desactiva la nota previamente seleccionada
     * y modifica su estado
     */
    const onSelectSlot = ( e ) => {
        dispatch( eventClearActiveEvent() );
    }
    /**
     * Pack de estilos de los eventos mostrados
     * en el calendario.
     * El ternario nos dice que si, un evento es de
     * nuestra propiedad, se mostrará de un color,
     * caso contrario, se mostrará de otro.
     */
    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
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