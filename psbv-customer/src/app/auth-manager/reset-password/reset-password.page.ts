import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  dataEmail;
  error: boolean = false;
 
  @Input() input: any;
  
  inputCode: FormGroup;

  error_messages = {
    'code1': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code2': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code3': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code4': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code5': [
      { type: 'required', message: 'Password is required.' },
    ],
    'code6': [
      { type: 'required', message: 'Password is required.' },
    ],
  }
  constructor(public formBuilder: FormBuilder,private router: Router, private authService: AuthService
  ) 
    {
      this.inputCode = this.formBuilder.group({
        code1: ['',[Validators.required]],
        code2: ['',[Validators.required]],
        code3: ['',[Validators.required]],
        code4: ['',[Validators.required]],
        code5: ['',[Validators.required]],
        code6: ['',[Validators.required]]

      },);
  }

  keytab(event, prevInput, fieldInput, nextInput) {
    if(this.inputCode.value[fieldInput] !== null && this.inputCode.value[fieldInput] !== '' && this.inputCode.value[fieldInput].toString().length > 1) {
      const strSplit = this.inputCode.value[fieldInput].toString();
      this.inputCode.controls[fieldInput].setValue(strSplit[0]);
      this.inputCode.controls[nextInput].setValue(strSplit[1]);
      document.getElementById(nextInput).focus()
    } 
    if(this.inputCode.value[fieldInput] !== null && this.inputCode.value[fieldInput] !== '' && this.inputCode.value[fieldInput].toString().length === 1) {
      document.getElementById(nextInput).focus()
    }
    if (this.inputCode.value[fieldInput] === null || this.inputCode.value[fieldInput] === '') {
      document.getElementById(prevInput).focus()
    }
  }
  resendCode(){
    this.authService.forgotPassword(this.dataEmail).subscribe(
      (data:any) => {
      this.router.navigateByUrl("/auth/reset-password");
  });
  }
  onSubmit() {
      var c1 = this.inputCode.get('code1').value;
      var c2 = this.inputCode.get('code2').value;
      var c3 = this.inputCode.get('code3').value;
      var c4 = this.inputCode.get('code4').value;
      var c5 = this.inputCode.get('code5').value;
      var c6 = this.inputCode.get('code6').value;
      var inputstring = `${c1}${c2}${c3}${c4}${c5}${c6}`;
      var tem_object = {
        "email": this.dataEmail.email,
        "code": inputstring
      }
      this.authService.checkcodePassword(tem_object).subscribe(
        (data:any) => {
        localStorage.setItem('Authorization', data.token);
        this.router.navigateByUrl("/auth/new-password");
      },
      (data:any)=> {
        if(data.errors) {
         this.error = true;
        }
      }
    )
  }
  backLogin() {
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    this.authService.receiveData.subscribe((data: any) => {
      this.dataEmail = data;
    })
  }
}
