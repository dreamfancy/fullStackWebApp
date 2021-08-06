import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _, { values } from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

const FIELDS =  [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: ' Email Body', name: 'body'},
    { label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends React.Component {
    // renderFieldOld() {
    //     return (
    //         <div>
    //             {/* <Field type="text" name="surveyTitle" component={SurveyField} label="inputLabel"/> */}
    //             <Field label="Survey Title" type="text" name="title" component={SurveyField} />
    //             <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
    //             <Field label="Email Body" type="text" name="body" component={SurveyField} />
    //             <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
    //         </div>
    //     );
    // }
    renderFields() {
        return  _.map(FIELDS, ({ label, name }) => { 
            return <Field key={name}  component={SurveyField} type="text" label={label} name={name} />
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => {})}>
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
    const errors = FIELDS.reduce((res, cur) =>{
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
    const errors = _.reduce(FIELDS, (res, cur) =>{
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
    _.each(FIELDS, ({name}) => {
        if(!values[name]) {
            errors[name] = `${name} cannot be empty !`
        }
    });
    return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate: validate
})(SurveyForm); 