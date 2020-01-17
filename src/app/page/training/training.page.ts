import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  image = {
    src: 'https://via.placeholder.com/550'
  };
  
  constructor(public alertController: AlertController) {  }

  async confirmDialog() {
    let alert = await this.alertController.create({
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
            // route eklenecek back olabilir. sorgu atılacak
          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit() {
  }

}
