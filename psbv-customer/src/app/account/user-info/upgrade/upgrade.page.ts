import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.page.html',
  styleUrls: ['./upgrade.page.scss'],
})
export class UpgradePage implements OnInit {

  constructor( 
    private router: Router,
    private accountService: AccountService,
    private pageNotiService: PageNotiService) { }
  email: any;
  role: any;
  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.role =localStorage.getItem('role');
  }


  setFalse() {

  }
  onSubmit(f: NgForm) {
      var param = {
        "email": localStorage.getItem('email')
      }
    const datapasing: IDataNoti = {
      title: 'EMAIL SENT !',
      description: 'You have sent an email for upgrade, Waiting for our reply',
      routerLink: '/account/user-info'
    }
   this.accountService.ContactAdmin(param).subscribe((data)=> {
      this.pageNotiService.setdataStatusNoti(datapasing);
      this.router.navigate(['/statusNoti']);
   })
  }
 
}
