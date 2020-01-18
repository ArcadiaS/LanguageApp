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
    private navCtrl: NavController,) {
      this.menu.enable(false);
    }

    ionViewWillEnter() {
      console.log('tabs page loaded')
      this.authService.getToken().then(() => {
        if(this.authService.isLoggedIn) {
          this.navCtrl.navigateRoot('tabs/home');
        }
      });
    }
    ngOnInit() {
      
    }
    async login() {
      const loginModal = await this.modalController.create({
        component: LoginPage,
      });
      return await loginModal.present();
    }
    async register() {
      const registerModal = await this.modalController.create({
        component: RegisterPage
      });
      return await registerModal.present();
    }
}
