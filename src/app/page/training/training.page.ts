import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

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
  course_id: any;
  lesson_id: any;
  training_id: any;

  training: any;
  training_contents: any;
  
  constructor(public alertController: AlertController, public activatedRoute: ActivatedRoute, public CourseService: CourseService, public nav: NavController) { 
    this.course_id = this.activatedRoute.snapshot.params["course_id"];
    this.lesson_id = this.activatedRoute.snapshot.params["lesson_id"];
    this.training_id = this.activatedRoute.snapshot.params["training_id"];
    this.getTraining()
   }

   getTraining(){
    this.CourseService.getTraining(this.course_id, this.lesson_id, this.training_id).subscribe(res => {
      console.log(res);
      this.training = res;
      this.training_contents = res.contents
      console.log(this.training_contents)
    }, err => {
      console.log(err);
    });
   }

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
            this.CourseService.finishTraining(this.course_id, this.lesson_id, this.training_id).subscribe(res => {
              this.nav.back()
            }, err => {
              console.log(err);
            });
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
