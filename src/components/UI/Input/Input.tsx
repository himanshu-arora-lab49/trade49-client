import React from 'react';
import classes from './Input.module.css';
import { Field } from '../../../models/field';

function input(props: any) {
    let inputElement = null;

    const field: Field = props.config;
    const inputClasses = [classes.InputElement];
    
    if (!field.valid && field.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (field.type) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                type={field.type}
                placeholder={field.placeHolder}
                value={field.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={field.value}
                    onChange={props.changed}>
                    {field.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                placeholder={field.placeHolder}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;