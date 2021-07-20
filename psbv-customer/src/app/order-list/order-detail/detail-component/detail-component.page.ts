import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.page.html',
  styleUrls: ['./detail-component.page.scss'],
})
export class DetailComponentPage implements OnInit {

  notes: string[] = [
    'component note 1',
    'component note 2 component note 2 component note 2 component note 2 component note 2',
    'component note 3',
    'component note 4'
  ]

  constructor() { }

  ngOnInit() { }
}
