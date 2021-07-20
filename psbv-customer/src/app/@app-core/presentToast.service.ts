import { Injectable} from '@angular/core';
import { ToastController } from '@ionic/angular';
import { COLOR_POPUP, ERROR } from './http';


@Injectable()
export class PresentToast {
    constructor(
        private toastController: ToastController,
    ) {}
    async presentToastVisible(colorPopup, error, duration?) {
        const toast = await this.toastController.create({
          color: colorPopup || COLOR_POPUP.primary,
          message: ERROR[error]?.English || error || ERROR.ERROR_IDENTIFY,
          duration: duration || 2000
        });
        await toast.present();
    }
}
