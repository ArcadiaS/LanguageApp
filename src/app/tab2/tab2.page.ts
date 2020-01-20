import { LoadingController } from '@ionic/angular';
import { CourseService } from './../services/course.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  courses: any;

  constructor(public CourseService: CourseService, public loadingCtrl: LoadingController) {
    this.getCourses()
  }

  

  async getCourses() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    await this.CourseService.getCourses()
      .subscribe(res => {
        console.log(res);
        this.courses = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
