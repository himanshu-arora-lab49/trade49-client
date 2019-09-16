import { FieldValidation } from "../models/fieldValidation";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules:FieldValidation ) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if ( rules.isRequired ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}
