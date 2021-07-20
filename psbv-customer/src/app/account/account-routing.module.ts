import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AccountPage
  // },
  {
    path: 'user-info',
    loadChildren: () => import('./user-info/user-info.module').then( m =>m.UserInfoPageModule )
  },
  {
    path: 'password-changed',
    loadChildren: () => import('./password-changed/password-changed.module').then( m => m.PasswordChangedPageModule)
  },
  {
    path: 'change-name',
    loadChildren: () => import('./change-name/change-name.module').then( m => m.ChangeNamePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
