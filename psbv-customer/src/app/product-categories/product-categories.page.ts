import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { AuthService, IPageRequest, ProductGroupsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';
import { ConnectivityService } from '../@app-core/utils/connectivity.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})

export class ProductCategoriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;

  scrHeight: any;
  scrWidth: any;

  pageRequest: IPageRequest;
  data = [];
  permission: string;
  val = '';
  counter = 0;
  inputValue: string = '';
  isMaxData = false;
  checkSystem = false;
  isLoading = false;
  previousUrl: any;
  isOnline;

  private backButtonService: any;
  constructor(
    private router: Router,
    private productGroupService: ProductGroupsService,
    private alertController: AlertController,
    private platform: Platform,
    private authService: AuthService,
    private connectivityService: ConnectivityService,
    private LoadingService: LoadingService
  ) {
    this.reset();
    this.getScreenSize();
    this.connectivityService.appIsOnline$.subscribe(online => {
      if (online) {
        this.LoadingService.dismiss();
        this.isOnline = true;
        this.loadData();
      } else {
        this.isOnline = false;
      }
    })
  }

  ngOnInit() {
    this.authService.receiveData.subscribe((data: any) => {
      this.previousUrl = data;
    })
    this.loadData();
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/main/product-categories') {
        this.presentAlert();
      }
      else {
        return;
      }
    }
    )
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
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

  goToUserInfo() {
    this.router.navigateByUrl("/account/user-info");
  }

  goToNoti() {
    this.router.navigateByUrl('notification');
  }

  gotoHome() {
    this.router.navigateByUrl('/main/product-categories');
  }

  onInput(event: any) {
    this.infinityScroll.disabled = false;
    this.inputValue = event.target.value;
    this.reset();
    this.scrollContent();
    this.counter++;
    this.loadData();
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/Vm39DR3.jpg"});
    }
  loadProductGroup() {
    this.productGroupService.getProductGroups(this.pageRequest).subscribe(data => {
      if (!this.data.some(a => a.id == data.product_groups[0].id)) {
        for (let item of data.product_groups) {
          // image not found
         this.imgnotFound(item);
          this.data.push(item);
        }

        this.counter++;

        this.infinityScroll.complete();
        this.pageRequest.page++;

        // check max data
        if (this.data.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
          this.isMaxData = true;
        }
      }

      this.isLoading = false;
    })
  }

  searchProductGroup() {
    const counterTemp = this.counter;
    this.productGroupService.searchGroup(this.pageRequest, this.inputValue, counterTemp).subscribe((data: any) => {
      if (counterTemp == this.counter) {
        if (!this.data.some(a => a.id == data.product_groups[0].id)) {
          for (let item of data.product_groups) {
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
    })
  }

  loadData() {
    if (this.isOnline && !this.isMaxData) {
      if (this.inputValue !== '') {
        this.searchProductGroup();
      } else {
        this.loadProductGroup();
      }
    } else {
      this.infinityScroll.complete();
    }
  }

  goToDetail(item) {
    const data = {
      id: item.id,
      title: item.name
    }
    this.router.navigate(['main/product-categories/products'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  reset() {
    this.pageRequest = {
      page: 1,
      per_page: 12,
      total_objects: 20
    }
    this.data = [];
    this.isLoading = true;
    this.isMaxData = false;
  }

  scrollContent() {
    this.ionContent.scrollToTop(500);
  }
}
