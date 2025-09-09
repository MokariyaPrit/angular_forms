import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  private from = viewChild.required<NgForm>('form')
  private destroyRef = inject(DestroyRef)

  constructor() {
      const savedForm = window.localStorage.getItem('saved-login-form');

      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.from().controls['email'].setValue(savedEmail);
        }, 1);
      }
    afterNextRender(() => {
      const subscription = this.from().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        )
      })
      this.destroyRef.onDestroy(() => subscription?.unsubscribe())
    }
    )
  }





  isSubmited = false
  onSubmit(formData: NgForm) {


    if (formData.form.invalid) {
      this.isSubmited = true
    }

    if (formData.form.valid) {
      const enteredEmail = formData.form.value.email
      const enteredPassword = formData.form.value.password

      console.log(enteredEmail, enteredPassword)
      formData.form.reset()
    }

  }
}
