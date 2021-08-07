import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import formFields from './formFields';
  
const SurveyFormReview = ({ onCancel, formValues }) => {
    const reviewFields = _.map(formFields, field => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>{formValues[field.name]}</div>
            </div>
        );
    });
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button 
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >  
                Back
            </button>
            <button className="green btn-flat white-text right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state);
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps)(SurveyFormReview);