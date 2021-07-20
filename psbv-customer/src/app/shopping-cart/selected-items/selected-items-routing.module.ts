import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedItemsPage } from './selected-items.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedItemsPageRoutingModule {}
