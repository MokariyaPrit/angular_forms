import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isSubmited = false;
  acquisitionOptions = ['google', 'friend', 'other'];

  passwordsMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password !== confirmPassword ? { passwordsNotMatching: true } : null;
  };

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, { validators: this.passwordsMatchValidator }),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    }),
    role: new FormControl('', Validators.required),
    acquisition: new FormArray([]),
    agree: new FormControl(false, Validators.requiredTrue),
  });

  get emailControl() { return this.form.get('email') as FormControl; }
  get passwordControl() { return this.form.get('passwords.password') as FormControl; }
  get confirmPasswordControl() { return this.form.get('passwords.confirmPassword') as FormControl; }

  onAcquisitionChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const acquisitionArray = this.form.get('acquisition') as FormArray;

    if (checkbox.checked) {
      acquisitionArray.push(new FormControl(checkbox.value));
    } else {
      const index = acquisitionArray.controls.findIndex(c => c.value === checkbox.value);
      acquisitionArray.removeAt(index);
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.isSubmited = true;
    this.form.reset();

    setTimeout(() => this.isSubmited = false, 3000);
  }

  onReset() {
    this.form.reset();
  }
}
