import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {

  constructor(public nav: NavController, public router: Router) { }

  ngOnInit() {
  }

  goToTraining(id){
    console.log(id)
    this.router.navigate(['tabs/courses/', 1, 'lesson', 1, 'training', '1'])
  }

  goToQuiz(id){
    this.router.navigate(['tabs/courses/', 1, 'lesson', 1, 'quiz', '1'])
  }
}
