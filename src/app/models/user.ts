export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;

  constructor() {
    this.id = 0;
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.token = '';
  }
}
