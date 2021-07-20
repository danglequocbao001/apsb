import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(private router: Router, private accountService: AccountService, private pageNotiService: PageNotiService) { }
  model: any = {
    "fullname": localStorage.getItem('email'),
    "question": "Text here ..." 
   };
   email: any;
  
  ngOnInit() {
    this.email = localStorage.getItem('email');
  }
  goBack() {
    this.router.navigateByUrl('account/user-info');
  }
  onSubmit(f: NgForm){
    const datapasing: IDataNoti = {
      title: 'SUCCESS !',
      description: 'Your response has been delivered',
      routerLink: '/account/user-info'
    }
    var obj_req = {
        "email_customer": localStorage.getItem('email'),
        "content": this.model.question
    }
    console.log(obj_req)
   this.accountService.ContactAdmin(obj_req).subscribe((data)=> {
      this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigate(['/statusNoti']);
   })
  }
}
