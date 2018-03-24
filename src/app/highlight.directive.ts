import { Directive, ElementRef,HostListener,Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlightColor: string;
  @Output('myClick') clicks = new EventEmitter(); //  @Output(alias) propertyName = ...

  constructor( private el:ElementRef) {
    this.highlight( 'blue')
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'yellow');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('blue');
  
  }
  
  @HostListener('click') onClick() {
    this.clicks.emit();
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }


  

}
