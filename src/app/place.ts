import { Coordinates } from './barrel';

export interface Place extends Coordinates {
  name: string;
  images: string[] | null;
}
