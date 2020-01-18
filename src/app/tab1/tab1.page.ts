import { Component } from '@angular/core';
import { User } from '../models/user/user';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user: User;
  
  constructor(private menu: MenuController, private authService: AuthenticationService) {
    this.menu.enable(true);
  }
  
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }
}
