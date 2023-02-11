import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  // @Input decorator allows to pass data from parent component to child component
  @Input() totalCartQuantity: number;
  @Input() userIsLoggedIn: boolean;

  // @Output decorator allows data to travel from child component to parent component
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
