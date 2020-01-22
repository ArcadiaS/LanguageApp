import { Storage } from '@ionic/storage';
import { LoginPage } from './../page/login/login.page';
import { RegisterPage } from './../page/register/register.page';
import { Component } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthenticationService,
    private navCtrl: NavController, private storage: Storage) {
      this.menu.enable(false);
    }

    
    ngOnInit() {
    }
    
}
