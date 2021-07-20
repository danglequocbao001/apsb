import { Component, OnInit } from '@angular/core';

export interface IDetails {
  title: string;
  des: string;
  day: string;
  src: string;
  check: boolean;
}
@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.page.html',
  styleUrls: ['./detail-notification.page.scss'],
})

export class DetailNotificationPage implements OnInit {

  constructor() { }
  Details: IDetails[] = [
  {
    title: "News",
    des: "Your item #34353333 status status, Your item #34353333 status status",
    day: "10/10/2020",
    src: "assets/img/products/11.png",
    check: false
  },
  {
    title: "Trải nghiệm tính năng mới",
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
 
]

  ngOnInit() {
  }

}
