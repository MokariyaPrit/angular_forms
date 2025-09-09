import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})


export class SignupComponent {
  isSubmited = false;

  // form = new FormGroup({
  //   email: new FormControl('', {
  //     validators: [Validators.email, Validators.required],
  //   }),
  //   passwords: new FormGroup({
  //     password: new FormControl('', {
  //       validators: [Validators.required, Validators.minLength(6)],
  //     }),
  //     confirmPassword: new FormControl('', {
  //       validators: [Validators.required, Validators.minLength(6)],
  //     }),
  //   }),
  //   firstName: new FormControl('', { validators: [Validators.required] }),
  //   lastName: new FormControl('', { validators: [Validators.required] }),
  //   address: new FormGroup({
  //     street: new FormControl('', { validators: [Validators.required] }),
  //     number: new FormControl('', { validators: [Validators.required] }),
  //     postalCode: new FormControl('', { validators: [Validators.required] }),
  //     city: new FormControl('', { validators: [Validators.required] }),
  //   }),
  //   role: new FormControl<
  //     'student' | 'teacher' | 'employee' | 'founder' | 'other'
  //   >('student', { validators: [Validators.required] }),
  //   agree: new FormControl(false, { validators: [Validators.required] }),
  // });
passwordsMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    return { passwordsNotMatching: true };
  }
  return null;
};
   form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: [this.passwordsMatchValidator] }
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      location: new FormControl('', { validators: [Validators.required] }),
      pincode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    agree: new FormControl(false, { validators: [Validators.requiredTrue] }),
  });

 get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

   get passwordIsInvalid() {
    return (
      this.form.controls.passwords.touched &&
      this.form.controls.passwords.dirty &&
      this.form.controls.passwords.invalid
    )
  
}
  get ConfirmPasswordIsInvalid() {
    return (
      this.form.controls.passwords.touched &&
      this.form.controls.passwords.dirty &&
      this.form.controls.passwords.invalid
    )
  
} 
  onSubmit() {
    console.log(this.form);
     // Mark all fields as touched to trigger validation display
    this.form.markAllAsTouched();
    this.form.controls.email.markAsDirty();
    this.form.controls.passwords.markAsDirty();



    if (this.form.invalid) {
      return;
    }


    console.log(this.form.value);
    
    this.form.reset();
    this.isSubmited = true;
    
    setTimeout(() => {
      this.isSubmited = false;
    }, 3000);
  }

  onReset() {
    this.form.reset();
  }
}