import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotiTrackingPage } from './noti-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: NotiTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotiTrackingPageRoutingModule {}
