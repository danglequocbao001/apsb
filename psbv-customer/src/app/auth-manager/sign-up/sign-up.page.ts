import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
 formSignup: FormGroup;

  error_messages = {
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Min password length is 8 ' },
      { type: 'maxlength', message: 'Max password length is 16' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message:'Min password length is 8' },
      { type: 'maxlength', message: 'Max password length is 16' }
    ],
    'name': [
        { type: 'required', message: 'Name is required.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email invalid.' },

  ],
  }
  public showSpinner = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    ) { 
        this.formSignup = this.formBuilder.group(
          {
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
          name: new FormControl('', Validators.compose([
            Validators.required
          ])),
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.email
          ])),
        }, { 
          validators: this.password.bind(this)
        });
    }
    
  password(formGroup: FormGroup) {
    const np = formGroup.get('password').value;
    const cp = formGroup.get('confirmpassword').value;
    if(np === cp)
    return ""
    else return { error: "Password not match"}
  }
    public type2 = 'password';
    public showPass2 = false;
    ngOnInit() {
    }
    async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Sign up successed',
      duration: 500
    });
    await toast.present();
  }

  async presentFailedToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    await toast.present();
  }

    async onSignUp(){
      this.showSpinner = true;
      var tem_obj = {
        "email": this.formSignup.get('email').value,
        "password": this.formSignup.get('password').value,
        "fullname": this.formSignup.get('name').value
      }
     
      this.authService.signup(tem_obj).subscribe((data) => {
        this.showSpinner = false;
        this.presentSuccessToast();
        setTimeout(()=>{
          this.router.navigateByUrl('main/auth-manager')
        },2000)
      },
      (data) =>{
        this.presentFailedToast('Fail! please try again.');
        this.showSpinner = false;
      })
    }
    showPassword2(){
      this.showPass2 = !this.showPass2;
      if(this.showPass2){
        this.type2 = 'text';
      }
      else {
        this.type2 ='password';
      }
    }
  gotoLogin(){
    this.router.navigate(['/auth/login']);
  }
}
