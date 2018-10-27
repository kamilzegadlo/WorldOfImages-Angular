export interface ActionResult<T> {
  isSuccess: boolean;
  result?: T;
  errorMessage?: string;
}
