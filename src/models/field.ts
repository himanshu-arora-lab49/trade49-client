import { FieldOptions } from './fieldOptions';
import { FieldValidation } from './fieldValidation';
export class Field {
    type: string;
    label: string;
    placeHolder: string;
    value: string;
    fieldValidation?: FieldValidation;
    options: FieldOptions[];
    valid: boolean = false;
    touched: boolean = false;

    constructor(type: string, label: string, placeHolder: string, value: string, fieldValidation?: FieldValidation,
        options: FieldOptions[] = [], valid: boolean = false) {
        this.type = type;
        this.label = label;
        this.placeHolder = placeHolder;
        this.value = value;
        this.fieldValidation = fieldValidation;
        this.options = options;
        this.valid = valid;
    }

}