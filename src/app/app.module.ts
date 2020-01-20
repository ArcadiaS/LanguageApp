import { RegisterPageModule } from './page/register/register.module';
import { LoginPageModule } from './page/login/login.module';
import { FormsModule } from '@angular/forms';
import { RegisterPage } from './page/register/register.page';
import { LoginPage } from './page/login/login.page';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { QuestionService } from './services/question.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [LoginPage, RegisterPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule, HttpClientModule, 
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }), 
    FormsModule, LoginPageModule, RegisterPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    QuestionService,
    AuthenticationService, LoginPage, RegisterPage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
