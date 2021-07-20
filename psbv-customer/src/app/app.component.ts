import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './@app-core/storage.service';
import { Router } from '@angular/router';
import { GlobalVariablesService } from './@app-core/global-variables.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private storageService: StorageService,
    public alertController: AlertController,
    private globalVariablesService: GlobalVariablesService,
    private network: Network
  ) {
    this.storageService.setInfoAccount();
    this.initializeApp();
  }
  ngOnInit() {
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
