import { Directive, OnInit, Input, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[kzFocus]' })
export class FocusDirective implements OnInit {

  @Input('kzFocus') isFocused: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    if (this.isFocused) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }
}
