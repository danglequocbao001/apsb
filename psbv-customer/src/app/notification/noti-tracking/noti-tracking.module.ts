import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiTrackingPageRoutingModule } from './noti-tracking-routing.module';

import { NotiTrackingPage } from './noti-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiTrackingPageRoutingModule
  ],
  declarations: [NotiTrackingPage]
})
export class NotiTrackingPageModule {}
