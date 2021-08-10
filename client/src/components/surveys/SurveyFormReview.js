import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import { submitSurvey } from '../../actions';
  
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
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
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >  
                Back
            </button>
            <button 
                className="green btn-flat white-text right"
                onClick={() => submitSurvey(formValues, history)}
            >
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

export default connect(mapStateToProps, {submitSurvey})(withRouter(SurveyFormReview)); 