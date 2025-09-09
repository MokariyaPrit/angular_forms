import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Add the strong password validator function
function strongPasswordValidator(): import("@angular/forms").ValidatorFn {
  return (control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    const errors: any = {};

    // Check minimum length
    if (value.length < 8) {
      errors['minLength'] = { requiredLength: 8, actualLength: value.length };
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = true;
    }

    // Check for at least one number
    if (!/\d/.test(value)) {
      errors['number'] = true;
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      errors['specialChar'] = true;
    }

    return Object.keys(errors).length > 0 ? { strongPassword: errors } : null;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[ReactiveFormsModule]
})
export class LoginComponent {
  isSubmited = false;
  specialChars = '!@#$%^&*';

  
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8), // Changed from 6 to 8
      strongPasswordValidator()
    ])
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
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  // Helper method to get specific password errors
  getPasswordErrors() {
    return this.form.controls.password.errors?.['strongPassword'];
  }

  onSubmit() {
    // Mark all fields as touched to trigger validation display
    this.form.markAllAsTouched();
    this.form.controls.email.markAsDirty();
    this.form.controls.password.markAsDirty();

    if (this.form.invalid) {
      return;
    }

    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
    
    this.form.reset();
    this.isSubmited = true;
    
    setTimeout(() => {
      this.isSubmited = false;
    }, 3000);
  }
}