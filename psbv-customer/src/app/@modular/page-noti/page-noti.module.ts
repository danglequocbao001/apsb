import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageNotiComponent } from './page-noti.component';
import { PageNotiRoutingModule } from './page-noti-routing.module';


@NgModule({
  declarations: [PageNotiComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageNotiRoutingModule
  ],
  exports: [PageNotiComponent],
})
export class PageNotiModule { }
