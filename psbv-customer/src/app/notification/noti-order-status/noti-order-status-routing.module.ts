import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotiOrderStatusPage } from './noti-order-status.page';

const routes: Routes = [
  {
    path: '',
    component: NotiOrderStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotiOrderStatusPageRoutingModule {}
