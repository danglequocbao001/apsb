import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/@app-core/auth-guard.service';
import { ProductsPage } from './products.page';


const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'product-info',
    loadChildren: () => import('./product-info/product-info.module').then(m => m.ProductInfoPageModule),
  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
