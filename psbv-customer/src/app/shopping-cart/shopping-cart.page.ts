import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { GlobalVariablesService } from '../@app-core/global-variables.service';
import { AuthService, ShoppingCartsService } from '../@app-core/http';
import { ConnectivityService } from '../@app-core/utils/connectivity.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  cartItems = [];
  cartItemsSelected = [];
  permission: string;
  loadedData = false;

  scrHeight: any;
  scrWidth: any;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  private backButtonService: any;
  isOnline;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private platform: Platform,
    private authService: AuthService,
    private globalVariablesService: GlobalVariablesService,
    private connectivityService: ConnectivityService,
    private shoppingCartsService: ShoppingCartsService
  ) {
    this.getScreenSize();
    this.connectivityService.appIsOnline$.subscribe(online => {
      this.isOnline = online ? true : false;
    })
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.authService.receiveData.subscribe((data: any) => {
      this.previousUrl = data;
    })
  }

  backButtonSystem(attr) {
    this.backButtonService = this.platform.backButton.subscribe(() => {
      if (attr === 'flex') {
        this.presentAlert();
      }
      else {
        if (this.previousUrl.search('/main/home/product-info') != -1) {
          this.router.navigateByUrl(this.previousUrl);
        }
        else if (this.previousUrl.search('/main/product-categories/products/product-info') != -1) {
          this.router.navigateByUrl(this.previousUrl);
        }
      }
    })
  }

  ionViewDidLeave() {
    this.backButtonService.unsubscribe();
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    if (this.hasBackButton()) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
        this.backButtonSystem(tabs[key].style.display);
      });
    }
    else {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
        this.backButtonSystem(tabs[key].style.display);
      });
    };
    this.getCarts();
  }

  getCarts() {
    this.shoppingCartsService.getShoppingCarts().subscribe(data => {

       this.cartItems = data.preferences?.cartItems;
      // this.cartItems = cartItems === undefined ? [] : cartItems;
      this.cartItemsSelected = [];
      this.cartItems.forEach(() => this.cartItemsSelected.push({selected: false}));
    })
  }

  updateCarts() {
    this.shoppingCartsService.updateShoppingCarts(this.cartItems).subscribe();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Do you want to exit app?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        },

      ]
    });
    await alert.present();
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  goBack() {
    this.router.navigateByUrl(this.globalVariablesService.backUrlShoppingCart);
  }

  hasBackButton() {
    const backUrl = this.globalVariablesService.backUrlShoppingCart;
    return backUrl.search('main/home/product-info') != -1 || backUrl.search('main/product-categories/products/product-info') != -1;
  }

  // calPrice(item) {
  //   return (item.price + item.accessories.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)) * item.quantity;
  // }

  // listAccessoriesName(item) {
  //   return item.accessories.reduce((acc, cur) => {
  //     return acc + ', ' + cur.name;
  //   }, '').substring(2);
  // }

  decreaseAmount(item) {
    if (item.amount > 1) {
      item.amount--;
      this.updateCarts();
    }
  }

  increaseAmount(item) {
    if (item.amount < 999) {
      item.amount++;
      this.updateCarts();
    }
  }

  removeItem(item) {
    for (let i of this.cartItems) {
      if (item.id == i.id) {
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
        this.cartItemsSelected.splice(this.cartItems.indexOf(item), 1);
        this.updateCarts();
        break;
      }
    }
  }
  async openModalRemove(item) {
    const alert = await this.alertController.create({
      message: 'Delete item from your cart?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.removeItem(item);
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

  toggleSelected(item) {
    item.selected = !item.selected;
  }

  checkAllSelected() {
    return this.cartItemsSelected.every(a => a.selected);
  }

  checkAllNotSelected() {
    return this.cartItemsSelected.every(a => !a.selected);
  }

  toggleSelectAll() {
    if (this.checkAllSelected()) {
      this.cartItemsSelected.forEach(a => a.selected = false);
    } else {
      this.cartItemsSelected.forEach(a => a.selected = true);
    }
  }

  calSelectedProducts() {
    let total = 0;
    for (let i = 0; i < this.cartItemsSelected.length; i++) {
      if (this.cartItemsSelected[i].selected && this.cartItems[i].kind == 'Product') {
        total += this.cartItems[i].amount;
      }
    }
    return total;
  }

  calSelectedAccessories() {
    let total = 0;
    for (let i = 0; i < this.cartItemsSelected.length; i++) {
      if (this.cartItemsSelected[i].selected && this.cartItems[i].kind == 'Accessory') {
        total += this.cartItems[i].amount;
      }
    }
    return total;
  }

  goToSelectedItems() {
    let data = {
      selectedItems: []
    }
    this.cartItemsSelected.forEach((a, index) => {
      if (a.selected) {
        const product = {
          name: this.cartItems[index].name,
          id: this.cartItems[index].id,
          amount: this.cartItems[index].amount,
          price: this.cartItems[index].price,
          kind: this.cartItems[index].kind
          // accessories: this.cartItems[index].accessories.filter(a => a.quantity > 0)
        }
        data.selectedItems.push(product);
      }
    })
    this.router.navigate(['/main/shopping-cart/selected-items'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  getIonContentAttribute(footerHeight) {
    return this.cartItems.length == 0 ? {
      height: `calc(100% - 90px)`,
      bottom: 0
    } : {
        height: `calc(100% - 90px - ${footerHeight}px)`,
        bottom: `${footerHeight}px`
      }
  }
}
