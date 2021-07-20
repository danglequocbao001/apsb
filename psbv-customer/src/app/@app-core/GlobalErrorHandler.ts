import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { COLOR_POPUP } from './http';
import { PresentToast } from './presentToast.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private presentToast: PresentToast,
        @Inject(Injector) private readonly injector: Injector
    ) {}
    handleError(error) {
        if(error && error.errors &&error.length>0)
        {
            for(let i=0; i<error.errors.length; i++){
              
                this.presentToast.presentToastVisible(COLOR_POPUP.warning, error.errors[i]);
            }
        }
        else{
            this.presentToast.presentToastVisible(COLOR_POPUP.warning,error.error);
        }
    }
    /**
     * Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
     * @returns {} 
     */
}
