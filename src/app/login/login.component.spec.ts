import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // This here lets you query the dom
  let de: DebugElement;
  let snackbar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {

    // Create your "fakes" here
    snackbar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        NoopAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      // This is how you give "fake" and testable stuff to your component
      providers: [
        { provide: MatSnackBar, useValue: snackbar },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This is where you prevent your coworkers from breaking shit. Seriously, this will save you.
  describe('visuals', () => {
    it('has an email field', () => {
      const controlBox = de.query(By.css('.email.control'));
      expect(controlBox).toBeTruthy();

      // You got the host, make the code easier to read. Just use it to query instead
      // of the original `de`
      const label = controlBox.query(By.css('.label'));

      // see this magic here? If you have the wrong input type, she breaks.
      const field = controlBox.query(By.css('input[type=email]'));

      expect(label).toBeTruthy();
      expect(field).toBeTruthy();

      // this here, this is just being polite
      expect(field.attributes?.autocomplete).toEqual('email');

      // But this here, this is how you can save yourself some time with 3rd party
      // onboarding like Help Hero.
      expect(field.attributes['data-some-tracker']).toEqual('login-email-field');
    });

    it('has a login button', () => {
      const spy = spyOn(component, 'submitPressed');
      const button = de.query(By.css('.submit'));
      expect(button).toBeTruthy();

      // test that the button is actually hooked up!!!
      // I'm serious, so many times I've forgotten to just hook up a button
      button.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });

    // I'm not doing these because they're literally the same pattern as above.
    // You can use these as "todos" until you're done
    it('has a password field', () => {
      const controlBox = de.query(By.css('.password.control'));
      expect(controlBox).toBeTruthy();

      const label = controlBox.query(By.css('.label'));
      const field = controlBox.query(By.css('input[type=password]'));

      expect(label).toBeTruthy();
      expect(field).toBeTruthy();
      expect(field.attributes?.autocomplete).toEqual('password');
      expect(field.attributes['data-some-tracker']).toEqual('login-password-field');
    });

    it('has a reset password button', () => {
      const spy = spyOn(component, 'resetPressed');
      const button = de.query(By.css('.reset-password'));
      expect(button).toBeTruthy();

      button.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  // Don't test UI stuff here. Like at all. This is for testing your event handlers.
  describe('functionality', () => {

    // this means we need a valid form
    it('emits the onSubmit on submit pressed with valid form', () => {
      const spy = spyOn(component.onSubmit, 'emit');
      component.form.setValue({ email: 'me@example.com', password: 'wtfangular' });
      component.submitPressed();

      // A key thing here. If you disabled a field, `.value` doesn't give you the disabled
      // fields. `.getRawValue()` however, that does give you disabled fields.
      const { email, password } = component.form.value;
      expect(spy).toHaveBeenCalledWith({ email, password });
    });

    it('does not emit onSubmit when form invalid', () => {
      // no setup needed, it starts invalid
      const spy = spyOn(component.onSubmit, 'emit');
      component.submitPressed();
      expect(spy).not.toHaveBeenCalled();
    });

    // This is how you test service integration. It literally works like this with everything.
    // BUT! I am only showing you this because sometimes you need services inside your component.
    // There are a few good reasons, but things like toasts shouldn't be done here.
    it('toasts error message when submitted invalid', () => {
      component.submitPressed();
      expect(snackbar.open).toHaveBeenCalledWith('All fields are required');
    });

    it('emits onPasswordReset on resetPressed', () => {
      const spy = spyOn(component.onResetPassword, 'emit');
      component.resetPressed();
      expect(spy).toHaveBeenCalled();
    });
  });
});
