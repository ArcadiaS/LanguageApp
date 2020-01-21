import { CourseService } from './../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {

  constructor(public nav: NavController, public router: Router, public activatedRoute: ActivatedRoute, public CourseService: CourseService, public alertService: AlertService) { }

  course_id: any;
  lesson_id: any;

  trainings: any;
  quizzes: any;
  ngOnInit() {
    this.course_id = this.activatedRoute.snapshot.params["course_id"];
    this.lesson_id = this.activatedRoute.snapshot.params["lesson_id"];
    this.CourseService.getTrainings(this.course_id, this.lesson_id).subscribe(res => {
      console.log(res);
      this.trainings = res;
    }, err => {
      console.log(err);
    });
    this.CourseService.getQuizzes(this.course_id, this.lesson_id).subscribe(res => {
      console.log(res);
      this.quizzes = res;
    }, err => {
      console.log(err);
    });
  }

  goToTraining(id, is_active){
      this.router.navigate(['tabs/courses/', this.course_id, 'lesson', this.lesson_id, 'training', id])
  }

  goToQuiz(id, is_active){
    if(!is_active) {
      this.alertService.presentToast("Bu Quiz Daha Önce Tamamlanmış");
    }else{
      this.router.navigate(['tabs/courses/', this.course_id, 'lesson', this.lesson_id, 'quiz', id])
    }
  }
}
