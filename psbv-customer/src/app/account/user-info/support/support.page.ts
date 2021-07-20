import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  data = [
    {
      name: 'About us',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt',
      isOpen: false
    },
    {
      name: 'Products',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt',
      isOpen: false
    },
    {
      name: 'Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt',
      isOpen: false
    },
    {
      name: 'Applications',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt',
      isOpen: false
    },
    {
      name: 'Customers',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, saepe? Numquam dolorem iure hic deserunt',
      isOpen: false
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleDescription(item) {
    item.isOpen = !item.isOpen;
  }

  goBack() {
    this.router.navigateByUrl('account/user-info');
  }
}
