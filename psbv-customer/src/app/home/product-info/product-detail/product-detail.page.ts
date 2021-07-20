import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
import { PERMISSIONS, ProductsService, ShoppingCartsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product = {
    id: '',
    name: ' ',
    code: '',
    description: ' ',
    short_description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }

  loadedProduct = false;
  permission = '';
  isOnline;
  cartItems = [];
  url:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private pageNotiService: PageNotiService,
    public globalVariablesService: GlobalVariablesService,
    public modalController: ModalController,
    private connectivityService: ConnectivityService,
    private shoppingCartsService: ShoppingCartsService,
    private iab: InAppBrowser,
     private toastController: ToastController,
  ) {
    this.checkOnline();
  }

  ngOnInit() {
    // this.storageService.infoAccount.subscribe(data => {
    //   this.permission = data !== null ? data.role : PERMISSIONS[0].value;
    // })

    if (this.isOnline === true) {
      this.loadingService.present();
      this.loadData();
    }
  }
  async presentFailedToast() {
    const toast = await this.toastController.create({
      message: 'Catalogue is not imported, Please connect admin!',
      duration: 2000
    });
    await toast.present();
  }
  ionViewWillEnter() {
      if (localStorage.getItem('Authorization') !== null) {
         this.getCarts();
      }
      else {

      }
  }

  checkOnline() {
    this.connectivityService.appIsOnline$.subscribe(online => {
      if (online) {
        this.isOnline = true;
        this.loadData();
      } else {
        this.isOnline = false;
      }
    })
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

  getCarts() {
    //if (localStorage.getItem('Authorization') !== null) {
      this.shoppingCartsService.getShoppingCarts().subscribe(data => {
        this.cartItems = data?.preferences?.cartItems || [];  
        // const cartItems = data.preferences.cartItems;
        // this.cartItems = cartItems === undefined ? [] : cartItems;
      })
    // } else {
      
    // }
  }

  updateCartsLocal(amount) {
    let duplicated = false;
    for (let i of this.cartItems) {
      if (i.kind == 'Product' && this.product.id == i.id) {
        i.amount += amount;
        duplicated = true;
        break;
      }
    }
    if (!duplicated) {
      this.cartItems.push({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        kind: 'Product',
        amount: amount
      });
    }
  }

  updateCartsSever() {
    if (localStorage.getItem('Authorization') !== null) {
    this.shoppingCartsService.updateShoppingCarts(this.cartItems).subscribe();
    } else {
    }
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
            id: this.product.id,
            name: this.product.name,
            amount: 0,
            price: this.product.price,
            kind: 'Product'
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
      if (params.data !== undefined && !this.loadedProduct) {
        this.productService.getProductDetail(JSON.parse(params['data']).id).subscribe(data => {
          if (!this.loadedProduct) {
           this.imgnotFound(data.product);
            this.product = data.product;
            this.url = data.product.catalogue?.url;
            
            this.loadedProduct = true;
            this.loadingService.dismiss();
            if (JSON.parse(params['data']).doesOpenModal) {
              this.openModalAdd();
            }
          }
        });
      }
    })
  }

  downloadTechnical() {
    if(this.url == null || this.url == '') {
      this.presentFailedToast();
    }
    else {
      const browser = this.iab.create(this.url,'_system', 'location=yes');
      browser.on('loadstop').subscribe(event => {
        browser.insertCSS({ code: "body{color: red;" });
      });
      browser.close();
    }
  }

  goToCart(): void {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }
}
