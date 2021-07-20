import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotiService } from './@modular/page-noti/page-noti.service';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from './@app-core';
import { AuthGuard } from './@app-core/auth-guard.service';
import { Network } from '@ionic-native/network/ngx';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule,
   
    IonicModule.forRoot(), 
    AppRoutingModule,
    CoreModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    PageNotiService,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
