import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  authenticationMode: string = 'sign-in';

  @Input() redirectPath: string;
  @Output() userUpdated: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {
    this.redirectPath = '/';
  }

  userAuthenticated(): void {
    if (this.redirectPath === '/') this.router.navigateByUrl(this.redirectPath);
    else location.reload();
  }
}
