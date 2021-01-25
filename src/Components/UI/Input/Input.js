import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let invalidParagraph = null;

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        invalidParagraph = (<p style={{
            backgroundColor: '#b59a97',
            color: '#ec3722'
        }}>Please enter a valid value!</p>);
    }
    else{
        invalidParagraph = null;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} >
                    {props.elementConfig.options.map(opt =>  (
                        <option
                        key={opt.value} 
                        value={opt.value}>
                            {opt.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />

    }
    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {invalidParagraph}
    </div>)
}

export default input;