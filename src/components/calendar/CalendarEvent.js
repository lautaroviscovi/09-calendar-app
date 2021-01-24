import React from 'react'
/**
 * El componente recibe el evento con su titulo
 * y el usuario que lo crea para mostrarlo en
 * el calendario
 */
export const CalendarEvent = ( { event } ) => {

    const { title, user } = event;

    return (
        <div>
            <strong> { title } </strong>
            
            <span> { user.name } </span>
        </div>
    )
}
