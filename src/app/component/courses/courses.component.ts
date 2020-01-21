import { CourseService } from './../../services/course.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  lessons: any;
  @Input() course_id: any;
  constructor(public nav: NavController,public CourseService: CourseService, public router: Router, private loadingCtrl: LoadingController, private storage: Storage) { }

  ngOnInit() {
    this.CourseService.getLessons(this.course_id).subscribe(res => {
      console.log(res);
      this.lessons = res;
    }, err => {
      console.log(err);
    });
  }

  goToLesson(lesson_id){
    // this.nav.navigateForward('lesson', id);
    this.router.navigate(['tabs/courses/', this.course_id, 'lesson', lesson_id])
  }
}

