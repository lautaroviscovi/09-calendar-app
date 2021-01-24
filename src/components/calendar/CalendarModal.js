import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventUpdated } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root');

  const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' );

  const after = now.clone().add( 1, 'hours' );
  // Mantengo el formulario limpio antes y despues de su uso
  const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: after.toDate(),
  }

export const CalendarModal = () => {

    const dispatch = useDispatch();

    // Store
    const { modalOpen } = useSelector( state => state.ui );

    const { activeEvent } = useSelector( state => state.calendar );
    // Manejo del estado de las fechas
    const [ dateStart, setDateStart ] = useState( now.toDate()  );
    // Manejo del estado del titulo para saber si es valido o no
    const [ titleValid, setTitleValid ] = useState( true );

    const [ dateEnd, setdateEnd ] = useState( after.toDate() );
    // Manejo el estado del formulario
    // y el inicio y fin del evento
    const [ formValues, setformValues ] = useState( initEvent );

    const { title, notes, start, end } = formValues;
    // El efecto esta pendiente de los cambios del activeEvent
    // Si abro nuevamente el modal, debe traer la informacion
    // y permitir editar
    useEffect( () => {
      if ( activeEvent ) {
        setformValues( activeEvent );
      } else {
        setformValues( initEvent );
      }
    }, [ activeEvent, setformValues ] );

    const handleInputChange = ( { target } ) => {
      setformValues( {
        ...formValues,
        [ target.name ]: target.value
      } ) 
    };

    const closeModal = () => {
      dispatch( uiCloseModal() );
      dispatch( eventClearActiveEvent() );
      setformValues( initEvent );
    };

    const handleStartDateChange = ( e ) => {
      setDateStart( e )
      setformValues( {
        ...formValues,
        start: e
      } )
    };

    const handleEndDateChange = ( e ) => {
      setdateEnd( e )
      setformValues( {
        ...formValues,
        end: e
      } )
    };
    // Capturo los datos del evento
    const handleSubmitForm = ( e ) => {
      e.preventDefault();
      
      const momentStart = moment( start );
      const momentEnd = moment( end );

      if ( momentStart.isSameOrAfter( momentEnd ) ) {
        return Swal.fire( 'Error', 'The end date and time must be greater than the start date', 'error' )
      }

      if ( title.trim().length < 2 ) {
        return setTitleValid( false ); 
      }

      // Graba un nuevo evento en el calendario
      // Condiciona si el evento existe para editar o crear
      if ( activeEvent ){
        dispatch( eventUpdated( formValues ) );
      } else {
        dispatch( eventStartAddNew( {
          ...formValues,
      } ) );
    }

      setTitleValid( true );
      closeModal();
    };

    return (
            
            <Modal
            isOpen = { modalOpen }
            onRequestClose = { closeModal }
            style = { customStyles }
            closeTimeoutMS = { 200  }
            className = 'modal'
            overlayClassName = 'modal-back'
            >

              <h1> { ( activeEvent ) ? 'Edit event' : 'New event' } </h1>
              <hr />
              <form className="container"
              onSubmit = { handleSubmitForm }
              >

                  <div className="form-group">
                      <label>Start Date</label>
                        <DateTimePicker
                          onChange = { handleStartDateChange }
                          value = { dateStart }
                          className = 'form-control'
                          
                          
                          />
                  </div>

                  <div className="form-group">
                      <label>End Date</label>
                      <DateTimePicker
                          onChange = { handleEndDateChange }
                          minDate = { dateStart }
                          value = { dateEnd }
                          className = 'form-control'
                          
                          
                          />
                  </div>

                  <hr />
                  <div className="form-group">
                      <label>Title & Notes</label>
                      <input 
                          type="text" 
                          className = { ` form-control ${ !titleValid && 'is-invalid' }` }
                          placeholder="Event title"
                          name="title"
                          autoComplete="off"
                          value = { title }
                          onChange = { handleInputChange }
                      />
                      <small id="emailHelp" className="form-text text-muted">Short description</small>
                  </div>

                  <div className="form-group">
                      <textarea 
                          type="text" 
                          className="form-control"
                          placeholder="Event notes"
                          rows="5"
                          name="notes"
                          value = { notes }
                          onChange = { handleInputChange }
                      ></textarea>
                      <small id="emailHelp" className="form-text text-muted">Aditional info</small>
                  </div>

                  <button
                      type="submit"
                      className="btn btn-outline-primary btn-block"
                  >
                      <i className="far fa-save"></i>
                      <span> Save </span>
                  </button>

              </form>

            </Modal>

    )
};