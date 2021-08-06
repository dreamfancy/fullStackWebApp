/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
 
export default ({ input, label, meta: { error, touched} }) => {
     return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {/* {touched && error ? error : null} */}
                {touched && error }
            </div>
        </div>
    );
} 