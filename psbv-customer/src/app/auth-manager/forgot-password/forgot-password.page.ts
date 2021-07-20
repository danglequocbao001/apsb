import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@app-core/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],

})
export class ForgotPasswordPage implements OnInit {

  message: string;
  checkrequired = false;
  checkpattern = false;
  checkvalid = false;
  constructor(private router: Router, private authService: AuthService,
    private toastController: ToastController,) {
  }

  inputEmail = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  async presentFailedToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    await toast.present();
   
  }
  onSubmit() {
    this.message = this.inputEmail.value;
    // validate form
    if (this.inputEmail.get('email').invalid && (this.inputEmail.get('email').dirty || this.inputEmail.get('email').touched)) {
      if (this.inputEmail.get('email').errors.required === true) {
        this.checkrequired = true;
      }
      else this.checkrequired = false;
    }
    else this.checkrequired = false;

    if (this.checkrequired) {
      this.checkpattern = false;
    }
    else if (!this.checkrequired && this.inputEmail.get('email').invalid && this.inputEmail.get('email').touched) {
      this.checkpattern = true;
    }
    else this.checkpattern = false;

    this.authService.forgotPassword(this.inputEmail.value).subscribe((data: any) => {
      this.router.navigateByUrl("/auth/reset-password");
      this.authService.sendData(this.message);
    },
    (data:any)=> {
      if(data.message) {
       this.presentFailedToast(data.message);
       }

    }
     );
  }
  ngOnInit() {

  }


}
