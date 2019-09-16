import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import classes from './AddTrade.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { Field } from '../../../models/field';
import { FieldValidation } from '../../../models/fieldValidation';
import { FieldOptions } from '../../../models/fieldOptions';
import { updateObject, checkValidity } from '../../../shared/utility';
import moment from 'moment';
import { Trade } from '../../../models/trade';
import Spinner from '../../../components/UI/Spinner/Spinner';

function addTrade(props: RouteComponentProps<any>) {

    const initialFormState: Field[] = [
        new Field('select', "Symbol", "Symbol", 'FB', undefined,
            [
                new FieldOptions("FB", "Facebook"),
                new FieldOptions("GOOGL", "Google"),
                new FieldOptions("AAPL", "Apple"),
                new FieldOptions("IBM", "IBM"),
                new FieldOptions("AMZN", "Amazon")
            ], true),
        new Field('text', "Time", "ExecutionTime, eg. 00:00:00 AM", '', new FieldValidation(false, true)),
        new Field('text', "Quantity", "Number of shares", '', new FieldValidation(true, true)),
        new Field('text', "Price", "Price per share", '', new FieldValidation(true, true))];

    const [tradeFormState, setTradeForm] = React.useState(initialFormState);
    const [isFormValid, setIsFormValid] = React.useState(false);
    const [postingData, setPostingData] = React.useState(false);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedField = [...tradeFormState]
        if (tradeFormState[inputIdentifier].label === 'Time') {
            updatedField[inputIdentifier].valid = moment(event.target.value, 'hh:mm:ss A', true).isValid() || moment(event.target.value, 'h:mm:ss A', true).isValid();
        } else {
            updatedField[inputIdentifier].valid = checkValidity(event.target.value, tradeFormState[inputIdentifier].fieldValidation);
        }
        updatedField[inputIdentifier].value = event.target.value;
        updatedField[inputIdentifier].touched = true;

        let formIsValid = true;
        for (let key in updatedField) {
            formIsValid = updatedField[key].valid && formIsValid;
        }
        setTradeForm(updatedField);
        setIsFormValid(formIsValid)
    }

    const saveTradeHandler = (isSaveAndExit: boolean) => {
        const trade: Trade = {
            id: Math.random(),
            symbol: tradeFormState[0].value,
            qty: +tradeFormState[3].value,
            price: +tradeFormState[2].value,
            time: tradeFormState[1].value
        }

        setPostingData(true);
        fetch('http://localhost:8000/trades', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trade)
        }).then(res => {
            setTradeForm(initialFormState);
            if (isSaveAndExit) {
                props.history.goBack();
            }
            setPostingData(false);
        })
    }

    const formItems = tradeFormState.map((field, index) => <Input key={field.placeHolder}
        label={tradeFormState[index].label} config={tradeFormState[index]} changed={(event) => { inputChangedHandler(event, index) }} />);

    let addTradeForm = <Spinner />
    if (postingData != true) {
        addTradeForm = (
            <div className={classes.AddTrade}>                
                {formItems}
                <div className={classes.Footer}>
                    <Button disabled={isFormValid != true} text="Save & Exit" clicked={() => { saveTradeHandler(true) }}></Button>
                    <Button disabled={isFormValid != true} text="Save & Add Another" clicked={() => { saveTradeHandler(false) }}></Button>
                    <Button text="Exit" clicked={() => { props.history.push('/') }}></Button>

                </div>
            </div>
        );
    }
    return (
        <React.Fragment>
            <div className={classes.Shadow}></div>
            {addTradeForm}
        </React.Fragment>
    );
}




export default addTrade;