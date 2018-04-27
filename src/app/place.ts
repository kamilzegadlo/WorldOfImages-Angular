import { Coordinates } from './Coordinates';

export interface Place extends Coordinates {
    name: string;
    images: File[];
  }