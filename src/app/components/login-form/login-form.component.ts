import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiError } from 'src/app/models/apiError';
import { prepareApiError } from 'src/app/utils/prepareApiError';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
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

  ngOnInit(): void {}

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  submitForm(): void {
    const spinnerName = 'signin-spinner';

    this.spinner.show(spinnerName);

    this.userService.login(this.email, this.password).subscribe({
      next: response => {
        this.userService.setUser(response);

        this.userUpdated.emit();
        this.apiError = new ApiError();

        this.el.nativeElement.dispatchEvent(
          new CustomEvent('user-logged-in', {
            bubbles: true
          })
        );
      },
      error: error => {
        this.spinner.hide(spinnerName);
        this.apiError = prepareApiError(error.error);
      },
      complete: () => this.spinner.hide(spinnerName)
    });
  }
}
