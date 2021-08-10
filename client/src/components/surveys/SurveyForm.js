import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _, { values } from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends React.Component {
    renderFields() {
        return  _.map(formFields, ({ label, name }) => { 
            return <Field key={name}  component={SurveyField} type="text" label={label} name={name} />
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text">
                         Next 
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate1 = (values) => { //same value as handleSubmit() callback argument
    const errors = formFields.reduce((res, cur) =>{
        //console.log(res);
        var curVal = cur.name;
        console.log(curVal);
        //if (!values[curVal]) {
            res[curVal] = `${curVal} cannot be empty !`
        //};
        return res;
    },{});
    return errors;
}

const validate2 = (values) => { //same value as handleSubmit() callback argument
    const errors = _.reduce(formFields, (res, cur) =>{
        var curVal = cur.name;
        console.log(curVal);
            res[curVal] = `${curVal} cannot be empty !`
        //};
        return res;
    },{});
    return errors;
}

const validate = values => {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({name}) => {
        if(!values[name]) {
            errors[name] = `${name} cannot be empty !`
        }
    });

    return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate: validate,
    destroyOnUnmount: false
})(SurveyForm); 