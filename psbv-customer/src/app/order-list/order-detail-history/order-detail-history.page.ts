import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OrdersService, ShoppingCartsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';

@Component({
  selector: 'app-order-detail-history',
  templateUrl: './order-detail-history.page.html',
  styleUrls: ['./order-detail-history.page.scss'],
})
export class OrderDetailHistoryPage implements OnInit {
  data = {
    id: '',
    code: ' ',
    status: '',
    order_details: [],
    audits: []
  }
  items = [];

  loadedData = false;
  isOnline;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private connectivityService: ConnectivityService,
    private toastController: ToastController,
    private shoppingCartsService: ShoppingCartsService
  ) {
    this.connectivityService.appIsOnline$.subscribe(online => {
      if (online) {
        this.isOnline = true;
        this.loadData();
      } else {
        this.isOnline = false;
      }
    })
  }

  ngOnInit() {
    if (this.isOnline === true) {
      this.loadingService.present();
      this.loadData();
    }
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  loadData() {
    this.route.queryParams.subscribe(params => {
      if (!this.loadedData) {
        this.ordersService.getOrderDetail(JSON.parse(params['data']).orderId).subscribe(data => {
          if (this.data.id == '') {
            this.data = data.order;
            if (this.checkReceivedStatus()) {
              const dateTime1 = this.data.audits[1].created_at;
              const dateTime2 = this.data.audits[2].created_at;
              this.pushData(dateTime1, 'Time shipping', dateTime2, 'Time received');
            } else if (this.checkCancelStatus()) {
              const dateTime1 = this.data.audits[this.data.audits.length - 1].created_at;
              const dateTime2 = ' ';
              this.pushData(dateTime1, 'Time cancel', dateTime2, 'Reason');
            }

            this.loadingService.dismiss();
          }
          this.loadedData = true;
        })
      }
    })
  }

  pushData(dateTime1, name1, dateTime2?, name2?) {
    this.items.push({
      name: name1,
      date: dateTime1.substring(0, 10),
      time: dateTime1.substring(11, 19)
    })
    if (dateTime2 && name2) {
      this.items.push({
        name: name2,
        date: dateTime2.substring(0, 10),
        time: dateTime2.substring(11, 19)
      })
    }
  }

  getStatusColor() {
    for (let i of this.ordersService.STATUSES) {
      if (this.data.status == i.NAME) {
        return i.COLOR;
      }
    }
  }

  checkReceivedStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[2].NAME;
  }

  checkCancelStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[3].NAME;
  }

  goToDetailComponent() {
    if (this.checkReceivedStatus()) {
      this.router.navigateByUrl('main/order-list/order-detail/detail-component');
    }
  }

  calProductsAmount() {
    return this.data.order_details.reduce((acc, cur) => cur.yieldable_type == this.ordersService.TYPES.PRODUCT.NAME ? acc + cur.amount : acc, 0)
  }

  calAccessoriesAmount() {
    return this.data.order_details.reduce((acc, cur) => cur.yieldable_type == this.ordersService.TYPES.ACCESSORY.NAME ? acc + cur.amount : acc, 0)
  }

  async openModalReOrder() {
    const alert = await this.alertController.create({
      message: `Add ${this.calProductsAmount()} products & ${this.calAccessoriesAmount()} accessories to cart?`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.updateShoppingCarts();
            return;
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        }
      ]
    });
    await alert.present();
  }

  async alertToast() {
    const toast = await this.toastController.create({
      message: `Add to cart successfully`,
      duration: 1000
    });
    toast.present();
  }

  updateShoppingCarts() {
    this.shoppingCartsService.getShoppingCarts().subscribe(data => {
      const cartItems = data?.preferences?.cartItems || []; 
      this.data.order_details.forEach(order => {
        let duplicated = false;
        for (let i of cartItems) {
          if (i.kind == order.kind && i.id == order.id) {
            i.amount += order.amount;
            duplicated = true;
            break;
          }
        }
        if (!duplicated) {
          cartItems.push({
            id: order.yieldable_id,
            name: order.name,
            price: order.price,
            kind: order.kind,
            amount: order.amount
          });
        }
      })
      this.shoppingCartsService.updateShoppingCarts(cartItems).subscribe(() => {
        this.alertToast();
      })
    })
  }
}
