import { Route } from '@angular/compiler/src/core';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { GlobalVariablesService } from '../@app-core/global-variables.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonContent) ionContent: IonContent;

  constructor(
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit() {

  }

  gotoShoppingCart() {
    this.globalVariablesService.backUrlShoppingCart = '';
  }
}
