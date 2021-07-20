import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'
import { AccountService, AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  email: any;
  btn: boolean = false;
  notOn: boolean = true;
  role: any;
  username: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit() {

  }
  checkRole(): boolean {
    return this.role === 'standard';
  }
  ionViewWillEnter() {
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('fullname');
  }
  goToAbout(): void {
    this.router.navigateByUrl('account/user-info/about-us')
  }
  goToPasswordChanged(): void {
    this.router.navigateByUrl('account/password-changed')
  }

  clicked() {
    this.btn = !this.btn;
    this.notOn = !this.notOn;
  }

  clickOveride() {
    if (this.btn == true && this.notOn == true) {
      this.btn = false;
    }
    else this.notOn = true;
  }

  gotoChangeName(){
    this.router.navigateByUrl('account/change-name');
  }
  gotoPasswordChange() {
    this.router.navigateByUrl('account/password-changed');
  }
  
  gotoUpgrade() {
    this.router.navigateByUrl('account/user-info/upgrade');
  }

  goToSupport() {
    this.btn = true
    this.notOn = false;
    this.router.navigateByUrl('account/user-info/support');
  }

  // alert
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Do you want to log out account?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
           this.authService.logout();
          }
        },
        {
          text: 'No',
          handler: (  ) => {
            return;
          }
        },

      ]
    });
    await alert.present();
  }
  gotoHome() {
    this.router.navigateByUrl('main/product-categories');
  }
  showAlert() {
    this.presentAlert();
  }
  gotoSupport(){
    this.btn = false;
    setTimeout(() => this.router.navigateByUrl('account/user-info/support'), 100);
    // this.router.navigateByUrl('account/user-info/support');
  }
}