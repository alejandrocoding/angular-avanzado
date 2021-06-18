import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.controls.password;
    const confirm = formGroup.controls.confirm;

    if (!password.value || !confirm.value) {
        return null;
    }
    return password.value === confirm.value ? null : { mismatch: true };
}

export function passwordMatchValidatorFn(formGroup: FormGroup): ValidatorFn {
    return (currentControl: AbstractControl) => {
        const password = formGroup.controls.password;
        const confirm = formGroup.controls.confirm;

        if (!password.value || !confirm.value) {
            return null;
        }
        return password.value === confirm.value ? null : { mismatch: true };
    }
}
