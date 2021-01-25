import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
    //Use join(' ') to create a string instead of an array []   so below becomes: '.Button .{ClassName (from props.ButtonType)} 
    className={[classes.Button, classes[props.ButtonType]].join(' ')}  
    onClick={props.clicked}
    disabled={props.disabled}>{props.children}</button>
);

export default button;