export interface BackEndResponse<T> {
  isSuccess: boolean;
  responseObject?: T;
  errorMessage?: string;
}
