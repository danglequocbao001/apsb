import { NgModule, ModuleWithProviders, InjectionToken, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AccountService, ProductGroupsService, ProductsService, GlobalService, ShoppingCartsService, AccessoriesService, OrdersService} from './http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntercepterService } from './http-interceptor';
import { API_URL } from './http/@http-config';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment.prod';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { ConnectivityService } from './utils/connectivity.service';
import { PresentToast } from './presentToast.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, 
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: CoreModule,
      providers: [
        PresentToast,
        { provide: API_URL, useValue: environment.apiUrl },
        { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        AuthService,
        StorageService,
        AccountService,
        ShoppingCartsService,
        ProductGroupsService,
        ProductsService,
        GlobalService,
        AccessoriesService,
        OrdersService,
        ConnectivityService,
      ]
    };
  }
}
