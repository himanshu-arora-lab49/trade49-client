export class FieldValidation {    
    isNumeric: boolean;
    isRequired: boolean;

    constructor(isNumeric: boolean = false, isRequired: boolean = false){
        this.isNumeric = isNumeric;
        this.isRequired = isRequired;
    }

}