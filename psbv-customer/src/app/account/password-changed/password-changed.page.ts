import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AccountService, AuthService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.page.html',
  styleUrls: ['./password-changed.page.scss'],
})
export class PasswordChangedPage implements OnInit {
  public type1 = 'password';
  public type2 = 'password';
  public type3 = 'password';

  public showPassCurrent = false;
  public showPassNew = false;
  public showPassNewAgain = false;
  formNewPass: FormGroup;
  checkcurrentpass = false;
  checknewpass = false;
  checkconfirmpass = false;
  checksamepass = false;

  messagecurrentpass = '';
  messagenewpass = '';
  messageconfirmpass = '';
  messagesampass = '';

  error_messages = {
    'newpassword': [
      { type: 'minlength', message: 'Min password length is 8' }

    ],
    'confirmpassword': [
      { type: 'minlength', message: 'Min password length is 8' }
    ],
    'currentpassword': [
      { type: 'required', message: 'Password is required.' },

    ],
  }

  constructor(
    public formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private accountService: AccountService,
    private pageNotiService: PageNotiService,
    private loadingService: LoadingService,
    private toastController: ToastController
  ) {
    this.formNewPass = this.formBuilder.group({

      newpassword: new FormControl('', Validators.compose([
        Validators.minLength(8),

      ])),
      currentpassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.minLength(8),

      ])),
    },
      {
        validators: this.password.bind(this)
      },
      // {
      //   validators: this.areEqual
      // }

    )
  }

  areEqual(formGroup: FormGroup) {
    const cp = formGroup.get('currentpassword').value;
    const np = formGroup.get('newpassword').value;
    if ((cp === np) && (cp !== "") && (np !== ""))
      return { error: "New password must diffrence Old password " }
    else return ""
  }

  password(formGroup: FormGroup) {
    const np = formGroup.get('newpassword').value;
    const npc = formGroup.get('confirmpassword').value;

    if (np === npc)
      return ""
    else return { error: "Password not match" }
  }
  ngOnInit() {

  }
  showPasswordCurrent() {
    this.showPassCurrent = !this.showPassCurrent;
    if (this.showPassCurrent) {
      this.type1 = 'text';
    }
    else {
      this.type1 = 'password';
    }
  }
  showPasswordNew() {
    this.showPassNew = !this.showPassNew;
    if (this.showPassNew) {
      this.type2 = 'text';
    }
    else {
      this.type2 = 'password';
    }
  }
  showPasswordNewAgain() {
    this.showPassNewAgain = !this.showPassNewAgain;
    if (this.showPassNewAgain) {
      this.type3 = 'text';
    }
    else {
      this.type3 = 'password';
    }
  }
  onSubmit() {

    const datapasing: IDataNoti = {
      title: 'PASSWORD CHANGED!',
      description: 'Your password has been changed, Continue using app',
      routerLink: '/main/home'
    }
    var result_object = {
      "password": this.formNewPass.get('currentpassword').value,
      "new_password": this.formNewPass.get('confirmpassword').value
    }
    this.error_messages.currentpassword.forEach(error => {
      if (this.formNewPass.get('currentpassword').hasError(error.type) && (this.formNewPass.get('currentpassword').dirty || this.formNewPass.get('currentpassword').touched)) {
        this.checkcurrentpass = true;
        this.messagecurrentpass = error.message;
      }
      else {
        this.checkcurrentpass = false;
        this.messagecurrentpass = '';
      }
    })
    if (this.formNewPass.get('confirmpassword').dirty || this.formNewPass.get('confirmpassword').touched) {
      this.checkconfirmpass = true;
      this.messageconfirmpass = 'Password is required!';
    }
    if (this.formNewPass.get('confirmpassword').value.length != 0) {

      if (this.formNewPass.get('confirmpassword').value.length < 8) {
        this.checkconfirmpass = true;
        this.messageconfirmpass = 'Min password length is 8.';
      }
      else if (this.formNewPass.get('confirmpassword').value.length > 16) {
        this.checkconfirmpass = true;
        this.messageconfirmpass = 'Max password length is 16.';
      }
      else {
        this.checkconfirmpass = false;
      }
    }
    if (this.formNewPass.get('newpassword').dirty || this.formNewPass.get('newpassword').touched) {
      this.checknewpass = true;
      this.messagenewpass = 'Password is required!';
    }
    if (this.formNewPass.get('newpassword').value.length != 0) {

      if (this.formNewPass.get('newpassword').value.length < 8) {
        this.checknewpass = true;
        this.messagenewpass = 'Min password length is 8.';
      }
      else if (this.formNewPass.get('newpassword').value.length > 16) {
        this.checknewpass = true;
        this.messagenewpass = 'Max password length is 16.';
      }
      else {
        this.checknewpass = false;
      }
    }
  

    if (this.formNewPass.errors === null) {
      this.checksamepass = false;
      this.messagesampass = '';
    }
    else {
      this.checksamepass = true;
      this.messagesampass = this.formNewPass.errors.error;
    }

    if(this.formNewPass.valid){
          this.accountService.updatePassword(result_object).subscribe(
            (data) => {
              this.pageNotiService.setdataStatusNoti(datapasing);
              this.router.navigate(['/statusNoti']);
            },
            (data) => {
                this.presentToast(data.errors);
            }
          )
    }
    else {
      this.presentToast('Please enter valid password !');
    }
  }
  async presentToast(errors) {

    const toast = await this.toastController.create({
      message: errors,
      duration: 2000
    });
    toast.present();
  }

  onCancel() {
    this.router.navigateByUrl('account/user-info');
  }

}
