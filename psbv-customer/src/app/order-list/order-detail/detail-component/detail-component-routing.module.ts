import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponentPage } from './detail-component.page';

const routes: Routes = [
  {
    path: '',
    component: DetailComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailComponentPageRoutingModule {}
