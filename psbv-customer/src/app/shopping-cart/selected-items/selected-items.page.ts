import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { OrdersService } from 'src/app/@app-core/http';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.page.html',
  styleUrls: ['./selected-items.page.scss'],
})
export class SelectedItemsPage implements OnInit {
  items = [];
  receiveData = [];
  isOnline: boolean;
  email: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageNotiService: PageNotiService,
    private order: OrdersService,
    private connectivityService: ConnectivityService,
    private loadingController: LoadingController,
    private toastController: ToastController,

  ) {
    this.connectivityService.appIsOnline$.subscribe(online => {
      this.isOnline = online ? true : false;
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.items = JSON.parse(params['data']).selectedItems;
    })
  }

  ionViewWillEnter() {
    this.email = localStorage.getItem('email');
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }
  async presentFailedToast() {
    const toast = await this.toastController.create({
      message: 'Fail, Please try again !',
      duration: 2000
    });
    await toast.present();
  }

  sendMailQuote() {
    this.presentLoading();
    const d: IDataNoti = {
      title: 'SEND A EMAIL QUOTE',
      description: '',
      routerLink: '/main/shopping-cart'
    }

    this.items.forEach((item) => {
      const i = {
        amount: "",
        yieldable_type: "",
        yieldable_id: ""
      }
      i.amount = item.amount;
      i.yieldable_type = item.kind;
      i.yieldable_id = item.id;
      this.receiveData.push(i);
    })
    const order = {
      "order": {
        "order_details_attributes": this.receiveData
      }
    }
    this.order.createOrder(order).subscribe((data: any) => {
      this.dismissLoading();
      this.pageNotiService.setdataStatusNoti(d);
      this.router.navigate(['/statusNoti']);
    },
    (data)=> {
      this.dismissLoading();
      this.presentFailedToast();
      
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Wait a minute...',
    });
    await loading.present();
    
  }
  async dismissLoading() {
   await this.loadingController.dismiss();
  }
  calTotalPrice() {
    return this.items.reduce((acc, cur) => acc + cur.price * cur.amount, 0);
  }

  calTotalProducts() {
    return this.items.reduce((acc, cur) => cur.kind == 'Product' ? acc + cur.amount : acc, 0);
  }

  calTotalAccessories() {
    return this.items.reduce((acc, cur) => cur.kind == 'Accessory' ? acc + cur.amount : acc, 0);
  }
}
