import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { PERMISSIONS, AccessoriesService, ShoppingCartsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { ConnectivityService } from 'src/app/@app-core/utils';
import { ModalPage } from 'src/app/home/product-info/product-detail/modal/modal.page';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.page.html',
  styleUrls: ['./accessory.page.scss'],
})
export class AccessoryPage implements OnInit {
  accessory = {
    id: '',
    name: ' ',
    code: '',
    description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }

  loadedAccessory = false;
  permission = '';
  cartItems = [];
  isOnline;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accessoriesService: AccessoriesService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    public globalVariablesService: GlobalVariablesService,
    public modalController: ModalController,
    private connectivityService: ConnectivityService,
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
    this.storageService.infoAccount.subscribe(data => {
      this.permission = data !== null ? data.role : PERMISSIONS[0].value;
    })
    if (this.isOnline === true) {
      this.loadingService.present();
      this.loadData();
    }
  }

  ionViewWillEnter() {
    this.getCarts();
  }

  getCarts() {
    // if(PERMISSIONS[0].value === 'guest') {

    // }
    // else {
      this.shoppingCartsService.getShoppingCarts().subscribe(data => {
        this.cartItems = data.preferences?.cartItems || [];

        // const cartItems = data.preferences.cartItems;
        // this.cartItems = cartItems === undefined ? [] : cartItems;
      })
    //}
  }

  updateCartsLocal(amount) {
    let duplicated = false;
    for (let i of this.cartItems) {
      if (i.kind == 'Accessory' && this.accessory.id == i.id) {
        i.amount += amount;
        duplicated = true;
        break;
      }
    }
    if (!duplicated) {
      this.cartItems.push({
        id: this.accessory.id,
        name: this.accessory.name,
        price: this.accessory.price,
        kind: 'Accessory',
        amount: amount
      });
    }
  }
  
  updateCartsSever() {
    this.shoppingCartsService.updateShoppingCarts(this.cartItems).subscribe();
  }

  checkGuestPermission() {
    return this.permission === PERMISSIONS[0].value;
  }

  checkStandardPermission() {
    return this.permission === PERMISSIONS[1].value;
  }

  checkPremiumPermission() {
    return this.permission === PERMISSIONS[2].value;
  }

  async openModalAdd() {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('auth/login');
    } else {
      const modal = await this.modalController.create({
        component: ModalPage,
        cssClass: 'modal-add-detail-product',
        componentProps: {
          data: {
            id: this.accessory.id,
            name: this.accessory.name,
            amount: 0,
            price: this.accessory.price,
            kind: 'Accessory'
            // url: this.product.thumb_image.url
          }
        }
      });
      await modal.present();

      const { data: amount, role } = await modal.onWillDismiss();
      if (role == 'ok') {
        this.updateCartsLocal(amount);
        this.updateCartsSever();
      }
    }
  }
  linkContactUs() {
    this.router.navigateByUrl('/account/user-info/about-us');
}
imgnotFound(item) {
  !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/Vm39DR3.jpg"});
  }
  loadData() {
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined && !this.loadedAccessory) {
        this.accessoriesService.getAccessoryDetail(JSON.parse(params['data']).id).subscribe(data => {
          if (!this.loadedAccessory) {
            this.imgnotFound(data.accessory);
            this.accessory = data.accessory;
            this.loadingService.dismiss();
            this.loadedAccessory = true;
          }
        });
      }
    })
  }

  goToCart(): void {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }
}
