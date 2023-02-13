import { ApiError } from '../models/apiError';

export const prepareApiError = (error: any): ApiError => {
  const apiError: ApiError = new ApiError();
  apiError.errorOccurred = true;
  apiError.statusCode = error.httpCode;
  apiError.errorCode = error.errorCode;
  apiError.errorMessage = error.title;
  apiError.traceId = error.traceId;

  return apiError;
};
