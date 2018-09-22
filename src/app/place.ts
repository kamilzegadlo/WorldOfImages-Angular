import { Coordinates } from './barrel';

export interface Place extends Coordinates {
  name: string;
  isDefined: boolean;
  images?: string[] | null;
}
