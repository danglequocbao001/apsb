import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OrdersService, ShoppingCartsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  scrHeight: any;
  scrWidth: any;

  data = {
    id: '',
    code: ' ',
    status: '',
    order_details: [],
    audits: []
  }
  statuses = [];
  normalStatusSize = 42;
  activeStatusSize = 62;
  activeStatus = this.data.status;
  shipping = {
    status: 'Arrive pick up point',
    statuses: [
      {
        name: 'Arrive pick up point',
        time: '08:23 am',
        date: '12/12/2020',
      },
      {
        name: 'Pick up items',
        time: '08:23 am',
        date: '12/12/2020',
      },
      {
        name: 'Domestic warehouse',
      },
      {
        name: 'Done',
      }
    ]
  }
  isActiveBtnShipping = false;

  loadedData = false;
  isOnline;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private alertController: AlertController,
    public toastController: ToastController,
    public sanitizer: DomSanitizer,
    private connectivityService: ConnectivityService,
    private shoppingCartsService: ShoppingCartsService
  ) {
    this.getScreenSize();
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
      this.ordersService.getOrderDetail(JSON.parse(params['data']).orderId).subscribe(data => {
        if (this.data.id == '') {
          this.data = data.order;
          this.activeStatus = this.data.status;

          const confirmedStatus = this.ordersService.STATUSES[0].NAME;
          const shippingStatus = this.ordersService.STATUSES[1].NAME;
          const receivedStatus = this.ordersService.STATUSES[2].NAME;
          const canceledStatus = this.ordersService.STATUSES[3].NAME;
          let hasPreviousCanceledStatus = false;

          this.pushData(confirmedStatus, this.data.audits[0].created_at);

          if (this.data.audits[1]) {
            if (this.data.audits[1].audited_changes.status[1] == shippingStatus) {
              this.pushData(shippingStatus, this.data.audits[1].created_at);
            } else if (this.data.audits[1].audited_changes.status[1] == canceledStatus) {
              this.pushData(canceledStatus, this.data.audits[1].created_at);
              hasPreviousCanceledStatus = true;
            }
          } else {
            this.pushData(shippingStatus);
          }

          if (!hasPreviousCanceledStatus) {
            if (this.data.audits[2]) {
              if (this.data.audits[2].audited_changes.status[1] == receivedStatus) {
                this.pushData(receivedStatus, this.data.audits[2].created_at);
              } else if (this.data.audits[2].audited_changes.status[1] == canceledStatus) {
                this.pushData(canceledStatus, this.data.audits[2].created_at);
              }
            } else {
              this.pushData(receivedStatus);
            }

            this.loadingService.dismiss();
          }
        }
        this.loadedData = true;
      })
    })
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  pushData(name, dateTime?) {
    let item: any = {
      name: name
    }
    if (dateTime) {
      item.date = dateTime.substring(0, 10);
      item.time = dateTime.substring(11, 19);
    }
    this.ordersService.STATUSES.forEach(status => {
      if (status.NAME == name) {
        item.color = status.COLOR;
        item.url = status.URL;
      }
    })
    this.statuses.push(item);
  }

  getStatusColor() {
    for (let i of this.ordersService.STATUSES) {
      if (this.data.status == i.NAME) {
        return i.COLOR;
      }
    }
  }

  checkConfirmedStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[0].NAME;
  }

  checkShippingStatus() {
    return this.data.status == this.ordersService.STATUSES[1].NAME;
  }

  checkReceivedStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[2].NAME;
  }

  checkCancelStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[3].NAME;
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

  calLineWith() {
    const n = this.statuses.length;
    return `calc(${this.normalStatusSize}px * (${n} - 1) + (${n} - 1) * (100% - ${this.normalStatusSize}px * ${n}) / ${n})`;
  }

  changeActiveStatus(status) {
    this.activeStatus = status.name;
    if (this.activeStatus != 'shipping') {
      this.isActiveBtnShipping = false;
    }
  }

  calProgressStatus() {
    for (let i = 0; i < this.statuses.length; i++) {
      if (this.statuses[i].name == this.data.status) {
        return i / (this.statuses.length - 1) * 100;
      }
    }
  }

  toggleBtnShipping() {
    this.isActiveBtnShipping = !this.isActiveBtnShipping;
  }

  calProgressShipping() {
    for (let i = 0; i < this.shipping.statuses.length; i++) {
      if (this.shipping.statuses[i].time === undefined) {
        return (i - 1) / (this.shipping.statuses.length - 1) * 100;
      }
    }
    return 100;
  }

  updateShoppingCarts() {
    this.shoppingCartsService.getShoppingCarts().subscribe(data => {
      const cartItems = data?.preferences?.cartItems || []; 
      this.data.order_details.forEach(order => {
        let duplicated = false;
        for (let i of cartItems) {
          if (i.kind == order.yieldable_type && i.id == order.yieldable_id) {
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
            kind: order.yieldable_type,
            amount: order.amount
          });
        }
      })
      this.shoppingCartsService.updateShoppingCarts(cartItems).subscribe((data) => {
        this.alertToast();
      })
    })
  }
}
