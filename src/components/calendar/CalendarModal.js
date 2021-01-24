import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

/**
 * Estilos por defecto del React-Big-Calendar
 */
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
  /**
   * El initEvent mantiene formulario limpio antes y despues de su uso
   */
  const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: after.toDate(),
  }

export const CalendarModal = () => {

    const dispatch = useDispatch();

    /**
     * Lecturas del store
     */
    const { modalOpen } = useSelector( state => state.ui );

    const { activeEvent } = useSelector( state => state.calendar );
    /**
     * Acá manejamos el estado de la fecha de inicio
     */
    const [ dateStart, setDateStart ] = useState( now.toDate()  );
    /**
     * Manejo del estado del título para saber si es válido o no
     */
    const [ titleValid, setTitleValid ] = useState( true );
    /**
     * Acá manejamos el estado de la fecha de finalizado
     */
    const [ dateEnd, setdateEnd ] = useState( after.toDate() );
    /**
     * Seteo el estado inicial del modal del calendario
     */
    const [ formValues, setformValues ] = useState( initEvent );

    const { title, notes, start, end } = formValues;

    /**
     * El efecto esta pendiente de los cambios del activeEvent
     * Si abro nuevamente el modal, debe traer la informacion
     * y permitir editar. Sino, devuelve el estado inicial
     */
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

    /**
     * Cierra el modal y reinicia el estado
     */
    const closeModal = () => {
      dispatch( uiCloseModal() );
      dispatch( eventClearActiveEvent() );
      setformValues( initEvent );
    };

    /**
     * Modifica los valores de la fecha de inicio en el
     * nuevo evento del calendario
     */
    const handleStartDateChange = ( e ) => {
      setDateStart( e )
      setformValues( {
        ...formValues,
        start: e
      } )
    };

    /**
     * Modifica los valores de la fecha de fin en el
     * nuevo evento del calendario
     */
    const handleEndDateChange = ( e ) => {
      setdateEnd( e )
      setformValues( {
        ...formValues,
        end: e
      } )
    };
    
    /**
     * Envío el nuevo evento.
     * Valido que el título no sea menor a 2 caracteres
     */
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

      /**
       * Graba el nuevo evento con todo el estado del formulario
       * y cierra el modal
       */
      if ( activeEvent ){
        dispatch( eventStartUpdate( formValues ) );
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
            closeTimeoutMS = { 200 }
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