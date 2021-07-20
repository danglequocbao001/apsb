import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { IPageRequest, PERMISSIONS, ProductGroupsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;
  scrHeight: any;
  scrWidth: any;
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 20
  }
  data = [];
  permission: string;
  title = '';
  id = '';
  priceString = '';
  loadedData = false;
  isMaxData = false;
  checkSystem = false;
  counter = 0;
  inputValue: string = '';
  isOnline;
  isLoading = true;
  data1 = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productGroupService: ProductGroupsService,
    private loading: LoadingService,
    private storageService: StorageService,
    private alertController: AlertController,
    private connectivityService: ConnectivityService
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
      this.loading.present();
      this.loadData();
    }
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })

    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined) {
        this.title = JSON.parse(params['data']).title;
        this.id = JSON.parse(params['data']).id;
      }
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
   
  }
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }
  imgnotFound(item) {
    // const d = {
    //   url: "https://i.imgur.com/Vm39DR3.jpg"
    // }
    // if(item.thumb_image == null ) {
    //   item['thumb_image'] = d;
    //  }
    //  else if(item.thumb_image.url == null) {
    //    item.thumb_image.url = d.url;
    //  }
     !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/Vm39DR3.jpg"});
    }
  loadDataProduct() {
    setTimeout(() => {
      if (this.id != '') {
        this.productGroupService.getProductGroupDetail(this.id, this.pageRequest).subscribe(data => {
          if (!this.data.some(a => a.id == data.products[0].id)) {
            for (let item of data.products) {
              // image not found
              this.imgnotFound(item);
              this.data.push(item);
            }
            this.infinityScroll.complete();
            this.pageRequest.page++;
            // check max data
            if (this.data.length >= data.meta.pagination.total_objects) {
              this.infinityScroll.disabled = true;
            }
            // // cal left per_page
            // const temp = data.meta.pagination.total_objects - this.data.length;
            // if (temp <= this.pageRequest.per_page) {
            //   this.pageRequest.per_page = temp;
            // }
          }
          this.loadedData = true;
          this.loading.dismiss();
        })
      }
    }, 50);
  }
  onInput(event: any) {
    this.infinityScroll.disabled = false;
    this.inputValue = event.target.value;
    this.reset();
    this.scrollContent();
    this.counter++;
    this.loadData();
  }
  scrollContent() {
    this.ionContent.scrollToTop(500);
  }
  reset() {
    this.pageRequest = {
      page: 1,
      per_page: 6,
      total_objects: 20
    }
    this.data = [];
    this.isLoading = true;
    this.isMaxData = false;
  }
  searchProductGroup() {
    const counterTemp = this.counter;
    this.productGroupService.searchProductGroup(this.pageRequest, this.inputValue, this.inputValue, counterTemp).subscribe((data: any) => {
      if (counterTemp == this.counter) {
        if (!this.data.some(a => a.id == data.products[0].id)) {
          for (let item of data.products) {
            // image not found
            this.imgnotFound(item);
            this.data.push(item);
          }
          this.counter++;

          this.infinityScroll.complete();
          // this.loading.dismiss();
          this.pageRequest.page++;

          // check max data
          if (this.data.length >= data.meta.pagination.total_objects) {
            this.infinityScroll.disabled = true;
            this.isMaxData = true;
          }
        }
        this.isLoading = false;
      }
      else {
        this.infinityScroll.complete();
      } 
    })
  }

  loadData() {
    if (this.isOnline && !this.isMaxData) {
      if (this.inputValue !== '') {
        this.searchProductGroup();
      } else {
        this.loadDataProduct();
      }
    } else {
      this.infinityScroll.complete();
    }
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSIONS[0].value;
  }

  checkStandardPermission(): boolean {
    return this.permission == PERMISSIONS[1].value;
  }

  goToNoti() {
    this.router.navigateByUrl('notification');
  }

  goToUserInfo() {
    this.router.navigateByUrl('account/user-info');
  }

  goToDetail(item) {
    this.setCartLocalStorage(item);
    const data = {
      id: item.id,
      categoryId: this.id,
      categoryTitle: this.title
    }
    this.router.navigate(['main/product-categories/products/product-info'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  setCartLocalStorage(item) {
    let dataSeenProducts = JSON.parse(localStorage.getItem('seenProducts')) || [];
    const product = {
      id: item.id,
      name: item.name,
      thumb_image: item.thumb_image,
      price: item.price,
      code: item.code
    }

    for (let i = 0, n = dataSeenProducts.length; i < n; i++) {
      if (item.id == dataSeenProducts[i].id) {
        dataSeenProducts.splice(i, 1);
        break;
      }
    }
    dataSeenProducts.unshift(product);
    localStorage.setItem('seenProducts', JSON.stringify(dataSeenProducts));
  }
}
