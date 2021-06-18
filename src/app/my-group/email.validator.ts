import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

import { Observable, of } from "rxjs";
import { delay, map } from 'rxjs/operators';

export function emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const email = (control.value as string).trim().toLowerCase();
        const existingEmails = ['alejandrofpo@gmail.com'];

        return of(existingEmails).pipe(
            delay(5000),
            map(emails => (emails.includes(email) ? { emailExists: true } : null))
        );
    };
}
