import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationPage } from './notification.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  },
  {
    path: 'detail-notification',
    loadChildren: () => import('./detail-notification/detail-notification.module').then( m => m.DetailNotificationPageModule)
  },
  {
    path: 'noti-order-status',
    loadChildren: () => import('./noti-order-status/noti-order-status.module').then( m => m.NotiOrderStatusPageModule)
  },
  {
    path: 'noti-tracking',
    loadChildren: () => import('./noti-tracking/noti-tracking.module').then( m => m.NotiTrackingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
