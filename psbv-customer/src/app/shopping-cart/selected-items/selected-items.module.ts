import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedItemsPageRoutingModule } from './selected-items-routing.module';

import { SelectedItemsPage } from './selected-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedItemsPageRoutingModule
  ],
  declarations: [SelectedItemsPage]
})
export class SelectedItemsPageModule {}
