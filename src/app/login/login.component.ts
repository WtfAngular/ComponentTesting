import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ILogin } from 'src/shared/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public onSubmit: EventEmitter<ILogin> = new EventEmitter();
  public onResetPassword: EventEmitter<void> = new EventEmitter();

  public form: FormGroup;

  constructor(
    private readonly snackbar: MatSnackBar,
  ) {
    // Yes put this here, it's easier to read than as a property above
    this.form = new FormGroup({
      email: new FormControl('', [ Validators.email, Validators.required ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
    });
  }

  // describe the user's behavior that results in this being called
  public submitPressed(): void {
    if (!this.form.valid) {
      this.snackbar.open('All fields are required');
      return;
    }

    const { value } = this.form;
    this.onSubmit.emit(value);
  }

  public resetPressed(): void {
    this.onResetPassword.emit();
  }

}
