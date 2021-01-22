import React, { useState } from 'react';
import Modal from 'react-modal';

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

export const CalendarModal = () => {
    // Maneja el estado del modal
    // Abierto o cerrado
    const [ isOpen, setIsOpen ] = useState( true );

    const closeModal = () => {
        setIsOpen( false )
    }

    return (
            
            <Modal
            isOpen = { isOpen }
            onRequestClose = { closeModal }
            style = { customStyles }
            closeTimeoutMS = { 200  }
            className = 'modal'
            overlayClassName = 'modal-back'
            >

                <h1> Hi World</h1>
                <hr />
                <span> Hi World again!</span>

            </Modal>

    )
};