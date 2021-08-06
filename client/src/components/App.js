import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header'; 
import { fetchUser } from "../actions";

import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
const App = (props) => {
    useEffect(() => {
         props.fetchUser();
    }, []);

    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Switch>
                    <Route path='/surveys/new' component={SurveyNew} />
                    <Route path='/surveys' component={Dashboard} />
                    <Route path='/' component={Landing} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default connect(null, { fetchUser })(App);
