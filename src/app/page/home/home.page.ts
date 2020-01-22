import { LoginPage } from './../../page/login/login.page';
import { RegisterPage } from './../../page/register/register.page';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthenticationService,
    private navCtrl: NavController, private storage: Storage) {
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
