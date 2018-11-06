import { Observable } from 'rxjs/Observable';

export class TestHelper {

  static waitToBeNull(compiled: any, selector: string, successfunction: any, counter: number = 0) {
    if (compiled.querySelector(selector) == null) {
      return successfunction();
    }

    if (counter > 20) {
      throw 'Timeout: waiting until null'
    }
    Observable.timer(500).subscribe(() => this.waitToBeNull(compiled, selector, successfunction, ++counter));
  }
}
