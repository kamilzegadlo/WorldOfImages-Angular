import { Coordinates } from './barrel';

export class Place implements Coordinates {

  constructor(private _x: number, private _y: number, private _name: string, private _isDefined: boolean, private _images: string[] | undefined = undefined) {

  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get name(): string {
    return this._name;
  }

  get isDefined(): boolean {
    return this._isDefined;
  }

  get images(): string[] | undefined {
    return this._images;
  }

  define() {
    this._isDefined = true;
  }

  addImage(image: string) {
    if (!this._images || this._images.length === 0) {
      this._images = [image];
    } else {
      this._images.push(image);
    }
  }

  clone() {
    return new Place(this._x, this._y, this._name, this._isDefined, this._images ? this._images.slice(0) : undefined);
  }

  static nullObject = new Place(-1, -1, '', false);
}
