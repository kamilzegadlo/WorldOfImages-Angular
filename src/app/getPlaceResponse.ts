import { Place } from './barrel';

export interface GetPlaceResponse {
  isSuccess: boolean;
  place?: Place;
  errorMessage?: string;
}
