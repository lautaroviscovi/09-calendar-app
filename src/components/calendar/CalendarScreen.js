import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from '../ui/NavBar';

const localizer = momentLocalizer( moment );

const events = [ {
    title: 'hola',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
} ]

export const CalendarScreen = () => {
    return (
        <div className = 'calendar-screen'>
            <NavBar />

            <Calendar
                localizer = {localizer}
                events = {events}
                startAccessor = "start"
                endAccessor = "end"
            />

        </div>
    )
};