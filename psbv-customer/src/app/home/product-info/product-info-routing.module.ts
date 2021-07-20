import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/@app-core/auth-guard.service';

import { ProductInfoPage } from './product-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProductInfoPage
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accessory',
    loadChildren: () => import('./accessory/accessory.module').then( m => m.AccessoryPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductInfoPageRoutingModule {}
