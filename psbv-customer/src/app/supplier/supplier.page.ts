import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit { 

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToUserInfo() {
    this.router.navigateByUrl("/account/user-info");
  }

  goToNoti() {
    this.router.navigateByUrl('notification');
  }
}
