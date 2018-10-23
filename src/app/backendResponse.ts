export interface BackendResponse<T> {
  isSuccess: boolean;
  responseObject?: T;
  errorMessage?: string;
}
