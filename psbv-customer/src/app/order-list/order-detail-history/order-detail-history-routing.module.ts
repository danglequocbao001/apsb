import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailHistoryPage } from './order-detail-history.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailHistoryPageRoutingModule {}
