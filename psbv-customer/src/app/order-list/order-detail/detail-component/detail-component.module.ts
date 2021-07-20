import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailComponentPageRoutingModule } from './detail-component-routing.module';

import { DetailComponentPage } from './detail-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailComponentPageRoutingModule
  ],
  declarations: [DetailComponentPage]
})
export class DetailComponentPageModule {}
