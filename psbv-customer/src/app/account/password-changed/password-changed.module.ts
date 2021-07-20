import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordChangedPageRoutingModule } from './password-changed-routing.module';

import { PasswordChangedPage } from './password-changed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordChangedPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [PasswordChangedPage]
})
export class PasswordChangedPageModule {}
