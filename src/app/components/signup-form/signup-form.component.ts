import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiError } from 'src/app/models/apiError';
import { UserService } from 'src/app/services/user.service';
import { prepareApiError } from 'src/app/utils/prepareApiError';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  hidePassword: boolean = true;

  apiError: ApiError = new ApiError();

  @Output() userUpdated: EventEmitter<void> = new EventEmitter();

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private el: ElementRef
  ) {}

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  submitForm(): void {
    const spinnerName = 'create-account-spinner';

    this.spinner.show(spinnerName);

    this.userService
      .createAccount(this.firstName, this.lastName, this.email, this.password)
      .subscribe({
        next: response => {
          this.userService.setUser(response);

          this.userUpdated.emit();

          this.el.nativeElement.dispatchEvent(
            new CustomEvent('user-logged-in', {
              bubbles: true
            })
          );

          this.apiError = new ApiError();
        },
        error: error => {
          this.spinner.hide(spinnerName);
          this.apiError = prepareApiError(error.error);
        },
        complete: () => this.spinner.hide(spinnerName)
      });
  }
}
