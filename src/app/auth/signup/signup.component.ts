import { Component } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class SignupComponent {

   isSubmited = false;
 

  signup = new FormGroup({
    
     email: new FormControl('', {
          validators: [Validators.email, Validators.required]
        }),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6), 
        ]),
         ConfirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6), 
        ])
      });

       get emailIsInvalid() {
    return (
      this.signup.controls.email.touched &&
      this.signup.controls.email.dirty &&
      this.signup.controls.email.invalid
    );
  }

    get passwordIsInvalid() {
    return (
      this.signup.controls.password.touched &&
      this.signup.controls.password.dirty &&
      this.signup.controls.password.invalid
    )
  
}
  get ConfirmPasswordIsInvalid() {
    return (
      this.signup.controls.ConfirmPassword.touched &&
      this.signup.controls.ConfirmPassword.dirty &&
      this.signup.controls.ConfirmPassword.invalid
    )
  
}


 passwordMatch = (this.signup.value.password === this.signup.value.ConfirmPassword)
  onSignUp() {
    // Mark all fields as touched to trigger validation display
    this.signup.markAllAsTouched();
    this.signup.controls.email.markAsDirty();
    this.signup.controls.password.markAsDirty();
    this.signup.controls.ConfirmPassword.markAsDirty();


    if (this.signup.invalid) {
      return;
    }


    if(this.passwordMatch){
    console.log(this.signup);
    const enteredEmail = this.signup.value.email;
    const enteredPassword = this.signup.value.password;
    console.log(enteredEmail, enteredPassword);
    
    this.signup.reset();
    this.isSubmited = true;
    
    setTimeout(() => {
      this.isSubmited = false;
    }, 3000);
  }
}
}
