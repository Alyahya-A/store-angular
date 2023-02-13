export class ApiError {
  errorOccurred: boolean;
  statusCode: number;
  errorCode: number;
  errorMessage: string;
  traceId: string;

  constructor() {
    this.errorOccurred = false;
    this.statusCode = 0;
    this.errorCode = 0;
    this.errorMessage = '';
    this.traceId = '';
  }
}
