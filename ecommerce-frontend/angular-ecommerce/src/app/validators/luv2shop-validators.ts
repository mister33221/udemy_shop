import { FormBuilder, FormControl, ValidationErrors } from "@angular/forms";

export class Luv2shopValidators {

    //shitespaces validators
    static notOnlyWhitespace(control: FormControl): ValidationErrors{
         
        //check if string only contain whitespaces
        if ((control.value != null) &&(control.value.trim().length ===0)) {
            //invalid, return eooro object
            return{'notOnlyWhitespace': true};
        }else{
            //valid, return null
            return null;
        }
    }
}
