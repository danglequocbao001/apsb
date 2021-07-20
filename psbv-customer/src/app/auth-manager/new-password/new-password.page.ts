import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],


})
export class NewPasswordPage implements OnInit {
  public type = 'password';
  public type2 = 'password';

  public showPass = false;
  public showPassConf = false;
  checkpassvalid = false;
  checkconfirm = false;
  checkpasssame = false;
  formNewPass: FormGroup;
  errormessage: string;
  errormessage2: string;
  errormessage3: string;

  error_messages = {
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Min password length is 8' },
      { type: 'maxlength', message: 'Max password length is 16' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Min password length is 8' },
      { type: 'maxlength', message: 'Max password length is 16' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private pageNotiService: PageNotiService
  ) {
    this.formNewPass = this.formBuilder.group({

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
    }, {
      validators: this.password.bind(this)
    });
  }
  password(formGroup: FormGroup) {
    const np = formGroup.get('password').value;
    const cp = formGroup.get('confirmpassword').value;
    if (np === cp)
      return ""
    else return { error: "Password not match" }
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    }
    else {
      this.type = 'password';
    }
  }
  showPasswordConf() {
    this.showPassConf = !this.showPassConf;
    if (this.showPassConf) {
      this.type2 = 'text';
    }
    else {
      this.type2 = 'password';
    }
  }
  onSubmit() {

    if (this.formNewPass.get('password').dirty || this.formNewPass.get('password').touched) {
      this.checkpassvalid = true;
      this.errormessage = 'Password is required!';
    }
    if (this.formNewPass.get('password').value.length != 0) {

      if (this.formNewPass.get('password').value.length < 8) {
        this.checkpassvalid = true;
        this.errormessage = 'Min password length is 8.';
      }
      else if (this.formNewPass.get('password').value.length > 16) {
        this.checkpassvalid = true;
        this.errormessage = 'Max password length is 16.';
      }
      else {
        this.checkpassvalid = false;
      }
    }
    if (this.formNewPass.get('confirmpassword').dirty || this.formNewPass.get('confirmpassword').touched) {
      this.checkconfirm = true;
      this.errormessage2 = 'Password is required!';
    }
    if (this.formNewPass.get('confirmpassword').value.length != 0) {
      if (this.formNewPass.get('confirmpassword').value.length < 8) {
        this.checkconfirm = true;
        this.errormessage2 = 'Min password length is 8 !';
      }
      else if (this.formNewPass.get('confirmpassword').value.length > 16) {
        this.checkconfirm = true;
        this.errormessage2 = 'Max password length is 16 !';
      }
      else {
        this.checkconfirm = false;
      }
    }
    if (this.formNewPass.errors === null) {
      this.checkpasssame = false;
    }
    else {
      this.checkpasssame = true;
      this.errormessage3 = this.formNewPass.errors.error;
    }
    const datapasing: IDataNoti = {
      title: 'PASSWORD CHANGED!',
      description: 'Your password has been changed',
      routerLink: '/auth/login'
    }
    var result_object = {
      "password": this.formNewPass.get('confirmpassword').value
    }
    if (this.formNewPass.valid) {
      this.authService.resetPassword(result_object).subscribe((data: any) => {
        this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigate(['/statusNoti']);
      });
    }

  }
  ngOnInit() {
  }


}
