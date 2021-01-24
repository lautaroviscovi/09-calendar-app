import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";

import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector( state => state.auth );

    useEffect( () => {
        
        dispatch( startChecking() );

    }, [ dispatch ] );

    // Podria poner un loading. Veremos.
    if ( checking ) {
        return <h5> Wait... </h5>
    }

    return (
            <Router>
                <div>
                    <Switch>
                        
                        <PublicRoute path = '/login'
                        component = { LoginScreen }
                        isAuthenticated = { !!uid }
                        />
                    

                        <PrivateRoute
                        exact
                        path = '/'
                        component = { CalendarScreen }
                        isAuthenticated = { !!uid }
                        />

                        <Redirect to = '/login' />

                    </Switch>
                </div>
            
            </Router>
    )
};