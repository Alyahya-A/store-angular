import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() totalCartQuantity: number;
  @Input() userIsLoggedIn: boolean;

  @Output() userLoggedOut: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.totalCartQuantity = 0;
    this.userIsLoggedIn = false;
  }

  ngOnInit(): void {}

  logout(): void {
    this.userLoggedOut.emit();
  }
}
