import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appResetPassword]'
})
export class ResetPasswordDirective {
  @Input() check: boolean;
  @Output() changeValue = new EventEmitter<boolean>();

  constructor( ) { 
    
  }
  ngOnInit() {
  }
  @HostListener('keydown',['$event']) onkeyup(el:any) {
    if(el.srcElement.maxLength === el.srcElement.value.length){
      el.preventDefault();
     
    }
    if(el.srcElement.maxLength && el.keyCode == 8 ) {

            el.srcElement.value = "";
       
      }
  }
//   @HostListener('keydown', ['$event']) onKeyDown(e:any) {
//     if(e.srcElement.maxLength && e.keyCode == 8 ) {

//       e.srcElement.value = "";
//       this.check = true;
//       this.changeValue.emit(this.check);
//     }
//     if (e.srcElement.maxLength === e.srcElement.value.length) {
//         e.preventDefault();
//         let nextControl: any = e.srcElement.nextElementSibling;
//      // Searching for next similar control to set it focus
//       while (true)
//       {
//           if (nextControl)
//           {

//               if (nextControl.type === e.srcElement.type)
//               {
//                   nextControl.focus();
//                   return;
//               }
//               else
//               {
//                   nextControl = nextControl.nextElementSibling;
//               }
//           }
//           else
//           {
//               return;
//           }
//       }
//   }
// }
}
