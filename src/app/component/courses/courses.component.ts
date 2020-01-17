import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor(public nav: NavController, public router: Router) { }

  ngOnInit() {}

  goToLesson(course_id, lesson_id){
    // this.nav.navigateForward('lesson', id);
    this.router.navigate(['tabs/courses/', 1, 'lesson', 1])
  }
}

