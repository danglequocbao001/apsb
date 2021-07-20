import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  amount = 1;
  constructor(
    private modalController: ModalController,
    public toastController: ToastController
  ) { }
  @Input() data: any;

  ngOnInit() {
  }
  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  increaseAmount() {
    if (this.amount < 999) {
      this.amount++;
    }
  }

  choose() {
    const amount = this.amount;
    this.modalController.dismiss(amount, 'ok');
    this.alertToast();
  }

  async alertToast() {
    const toast = await this.toastController.create({
      message: `Add ${this.data.kind} successfully`,
      duration: 1000
    });
    toast.present();
  }

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }
}
