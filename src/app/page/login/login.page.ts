import { RegisterPage } from './../register/register.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalController: ModalController,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private alertService: AlertService
) { }

  ngOnInit() {
  }
    // Dismiss Login Modal
    dismissLogin() {
      this.modalController.dismiss();
    }
    // On Register button tap, dismiss login modal and open register modal
    async registerModal() {
      this.dismissLogin();
      const registerModal = await this.modalController.create({
        component: RegisterPage
      });
      return await registerModal.present();
    }
    login(form: NgForm) {
      this.authService.login(form.value.email, form.value.password).subscribe(
        data => {
          this.alertService.presentToast("Logged In");
        },
        error => {
          console.log(error);
        },
        () => {
          this.dismissLogin();
          this.navCtrl.navigateRoot('/tabs');
        }
      );
    }
    // Dismiss Register Modal
    dismissRegister() {
      this.modalController.dismiss();
    }
    // On Login button tap, dismiss Register modal and open login Modal
    async loginModal() {
      this.dismissRegister();
      const loginModal = await this.modalController.create({
        component: LoginPage,
      });
      return await loginModal.present();
    }
    register(form: NgForm) {
      this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
        data => {
          this.authService.login(form.value.email, form.value.password).subscribe(
            data => {
            },
            error => {
              console.log(error);
            },
            () => {
              this.dismissRegister();
              this.navCtrl.navigateRoot('/tabs');
            }
          );
          this.alertService.presentToast(data['message']);
        },
        error => {
          console.log(error);
        },
        () => {
          
        }
      );
    }
    
}
