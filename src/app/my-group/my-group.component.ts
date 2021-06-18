import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { passwordMatchValidator, passwordMatchValidatorFn } from './password-match.validator';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.scss']
})
export class MyGroupComponent implements OnInit {

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([^0-9]*)$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^([^0-9]*)$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirm: ['', { updateOn: 'blur', Validators: [Validators.required, Validators.minLength(3)] }],
    },
      // { validators: passwordMatchValidator }
    );

    this.form.setValidators(passwordMatchValidatorFn(this.form));

    this.form.valueChanges.pipe().subscribe(v => {
      console.log('VALUE CHANGED', v);
    });
  }

  get name() {
    return this.form.controls.name;
  }

  get lastName() {
    return this.form.controls.lastName;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirm() {
    return this.form.controls.confirm;
  }

  resetNoEmit() {
    this.form.reset({ name: '', lastName: '', email: '' }, { emitEvent: false });
  }
}
