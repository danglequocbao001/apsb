import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductCategoriesPageRoutingModule } from './product-categories-routing.module';
import { ProductCategoriesPage } from './product-categories.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoriesPageRoutingModule,
  ],
   
    declarations: [ProductCategoriesPage]
})
export class ProductCategoriesPageModule {}
