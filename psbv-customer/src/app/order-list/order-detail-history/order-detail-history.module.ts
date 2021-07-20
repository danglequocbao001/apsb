import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailHistoryPageRoutingModule } from './order-detail-history-routing.module';

import { OrderDetailHistoryPage } from './order-detail-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailHistoryPageRoutingModule
  ],
  declarations: [OrderDetailHistoryPage]
})
export class OrderDetailHistoryPageModule {}
