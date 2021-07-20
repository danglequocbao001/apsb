import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appNoti]'
})
export class NotiDirective {
  firstCheck: boolean = true;
  constructor(private el: ElementRef) {};
  turnOffNoti(){
    this.firstCheck = false;
    this.el.nativeElement.style.display = 'none';
  } 
}
