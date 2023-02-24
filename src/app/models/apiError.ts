export class ApiError {
  errorOccurred: boolean;
  statusCode: number;
  errorCode: number;
  errorMessage: string;
  traceId: string;

  constructor() {
    this.errorOccurred = false;
    this.statusCode = -1;
    this.errorCode = -1;
    this.errorMessage = '';
    this.traceId = '';
  }
}
