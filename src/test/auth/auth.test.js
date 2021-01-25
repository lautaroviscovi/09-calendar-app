import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

describe('Pruebas en acciones de Auth', () => {
    
    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });


    test('startLogin correcto', async () => {
        
        await store.dispatch( startLogin( 'elon@spacex.com', '123456' ) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number));

    });

    test('startLogin incorrecto', async () => {

        await store.dispatch( startLogin( 'elon@spacex.com', '1234567890' ) );

        let actions = store.getActions();

        expect( actions ).toEqual( [] );

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "Password not match", "error");
        
        await store.dispatch( startLogin( 'eloncito@spacex.com', '123456' ) );

        actions = store.getActions();

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "User or Password does not match", "error");
    });
    


    

});
