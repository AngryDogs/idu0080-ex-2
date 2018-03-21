import React from 'react';

const Alert = (props) => (
    <div className="alert alert-danger" role="alert">
        {props.information}
    </div>
);

export default Alert;