import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController
  ) { }

  async present(text?) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: text
    })
      .then(a => a.present()
        .then(() => {
          if (!this.isLoading) {
            a.dismiss();
          }
        }));
  }

  async dismiss() {
    this.isLoading = false;
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        break;
      }
      topLoader = await this.loadingController.getTop();
    }
  }
 
}
