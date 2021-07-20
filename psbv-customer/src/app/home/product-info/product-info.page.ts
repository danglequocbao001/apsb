import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { AccessoriesService, AuthService, IPageRequest, PERMISSIONS, ProductsService, ShoppingCartsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})

export class ProductInfoPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  scrHeight: any;
  scrWidth: any;

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 6,
    total_objects: 20
  }
  permission = '';
  accessories = [];
  product = {
    id: '',
    name: ' ',
    description: ' ',
    code: '',
    short_description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }
  accessoryIds = [];
  products = [];
  cartItems = [];
  loadedProduct = false;
  loadedAccessories = false;
  previousUrl: any;
  isOnline;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private loading: LoadingService,
    private accessoriesService: AccessoriesService,
    private storageService: StorageService,
    private authService: AuthService,
    private globalVariablesService: GlobalVariablesService,
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
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })
    if (this.isOnline === true) {
      this.loading.present();
      this.loadData();
    }
    this.previousUrl = this.router.url;
    this.authService.sendData(this.previousUrl);
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });

    this.getCarts();
  }

  getCarts() {
   if (localStorage.getItem('Authorization') !== null) {
      this.shoppingCartsService.getShoppingCarts().subscribe(data => {
        this.cartItems = data?.preferences?.cartItems || [];  
        // const cartItems = data.preferences.cartItems;
        // this.cartItems = cartItems === undefined ? [] : cartItems;
      })
    } else {
    }
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  goToDetail(): void {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('/auth/login');
    } else {
      const data = {
        id: this.product.id,
      }
      this.router.navigate(['/main/home/product-info/product-detail'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      });
    }
  }

  goToCart(): void {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }

  getItem(accessory): any {
    return accessory.quantity > 0 ?
      {
        background: '#494949',
        color: 'white'
      }
      :
      {
        background: '#eaeaea',
        color: '#636363'
      }
  }

  selectAllItem(): void {
    this.accessoryIds.forEach(accessory => {
      if (accessory.quantity == 0) {
        accessory.quantity++;
      }
    });
  }

  addProduct(): void {
    const data = {
      id: this.product.id,
      doesOpenModal: true
    }
    this.router.navigate(['/main/home/product-info/product-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  addAccessory(accessory) {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('/auth/login');
    } else {
      const data = {
        id: accessory.id,
      }
      this.router.navigate(['/main/home/product-info/accessory'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      });
    }
  }

  checkGuestPermission(): boolean {
    return this.permission == PERMISSIONS[0].value;
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/Vm39DR3.jpg"});
    }
  loadData() {
    
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined && !this.loadedProduct) {
        this.productService.getProductDetail(JSON.parse(params['data']).id)
          .subscribe(data => {
            this.imgnotFound(data.product);
            this.product = data.product;
            this.loadedProduct = true;
            if (this.loadedProduct && this.loadedAccessories) {
              this.loading.dismiss();
            }
          });

        this.accessoriesService.getAccessoriesWithProductId(this.pageRequest, JSON.parse(params['data']).id).subscribe(data => {
          if (!this.accessories.some(a => a.id == data.accessories[0].id)) {
            for (let item of data.accessories) {
              this.imgnotFound(item);
              this.accessories.push(item);
              this.accessoryIds.push({
                id: item.id,
                quantity: 0,
                price: item.price
              })
            }

            if (this.loadedProduct && this.loadedAccessories) {
              this.loading.dismiss();
            }
            this.pageRequest.page++;

            // check max data
            if (this.accessories.length >= data.meta.pagination.total_objects) {
              this.infinityScroll.disabled = true;
            }
          }
          this.loadedAccessories = true;
        })
      }
    })
  }

  loadMoreAccessories() {
    this.accessoriesService.getAccessoriesWithProductId(this.pageRequest, this.product.id).subscribe(data => {
      for (let item of data.accessories) {
       this.imgnotFound(item);
        this.accessories.push(item);
        this.accessoryIds.push({
          id: item.id,
          quantity: 0,
          price: item.price
        })
      }

      this.infinityScroll.complete();
      this.pageRequest.page++;

      // check max data
      if (this.accessories.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }
    })
  }

  // isEqual(a, b) {
  //   // if length is not equal 
  //   if (a.length != b.length)
  //     return false;
  //   else {
  //     // comapring each element of array 
  //     for (var i = 0; i < a.length; i++) {
  //       if (a[i].id != b[i].id || a[i].quantity != b[i].quantity) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   }
  // }

  // setLocalStorage() {
  //   localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  // }

  // decreaseQuantity(accessory) {
  //   if (accessory.quantity > 0) {
  //     accessory.quantity--;
  //   }
  // }

  // increaseQuantity(accessory) {
  //   accessory.quantity++;
  // }
}
