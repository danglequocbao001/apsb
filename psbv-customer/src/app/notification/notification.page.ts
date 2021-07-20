import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../@app-core/http';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  doesClick = false;
  previousUrl: any;
  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.previousUrl =  this.router.url;
    this.authService.sendData(this.previousUrl);
  }

  gotoNoti(){
    this.router.navigateByUrl('notification/detail-notification');
  }
  gotoNotiStatus(){
    this.router.navigateByUrl('notification/noti-order-status');
  }
  gotoNotiTracking(){
    this.router.navigateByUrl('notification/noti-tracking');
  }

  toggleActive() {
    this.doesClick = !this.doesClick;
  }
}
