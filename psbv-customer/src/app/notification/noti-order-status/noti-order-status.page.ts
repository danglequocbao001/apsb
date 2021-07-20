import { Component, OnInit, Directive, ElementRef } from '@angular/core';

export interface IDetails {
  title: string;
  des: string;
  day: string;
  src: string;
  check:boolean
}
@Component({
  selector: 'app-noti-order-status',
  templateUrl: './noti-order-status.page.html',
  styleUrls: ['./noti-order-status.page.scss'],
})

export class NotiOrderStatusPage implements OnInit {

  constructor(private el: ElementRef) { }

  Details: IDetails[] = [
    {
      title: "News",
      des: "Your item #34353333 status status, Your item #34353333 status status",
      day: "10/10/2020",
      src: "assets/img/products/11.png",
      check: false
    },
    {
      title: "News",
      des: "Your item #34353333 status status, Your item #34353333 status status",
      day: "01/08/2020",
      src: "assets/img/products/11.png",
      check: false
    },
    {
      title: "News",
      des: "Your item #34353333 status status, Your item #34353333 status status",
      day: "10/10/2020",
      src: "assets/img/products/11.png",
      check: false
    },
    {
      title: "News",
      des: "Your item #34353333 status status, Your item #34353333 status status",
      day: "10/10/2020",
      src: "assets/img/products/11.png",
      check: false
    },
    {
      title: "News",
      des: "Your item #34353333 status status, Your item #34353333 status status",
      day: "10/10/2020",
      src: "assets/img/products/11.png",
      check: false
    },
    {
      title: "News",
      des: "Your item #34353333 status status, Your item #34353333 status status",
      day: "10/10/2020",
      src: "assets/img/products/11.png",
      check: false
    },
    {
      title: "News",
      des: "Your item #34353333 status status, Your item #34353333 status status",
      day: "10/10/2020",
      src: "assets/img/products/11.png",
      check: false
    },
  ]
  

  ngOnInit() {
  }
  
}
