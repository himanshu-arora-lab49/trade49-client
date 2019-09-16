import React, { Children } from 'react';
import classes from './Button.module.css';
import { RouteComponentProps } from 'react-router';

interface ButtonProps {
    disabled?: boolean,    
    clicked: any
    text: string
}


function button(props : ButtonProps) {
    return (
        <button
        disabled={props.disabled}
        className={classes.Button}
        onClick={props.clicked}>{props.text}</button>
    );
}

export default button;