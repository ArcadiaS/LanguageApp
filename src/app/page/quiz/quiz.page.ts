import { QuestionService } from './../../services/question.service';
import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;
  score: number = 0;
  slideOptions: any;
  questions: any;

  constructor(public dataService: QuestionService, public navCtrl: NavController) 
    {

    }
    
    ionViewDidLoad() {
      
      this.slides.lockSwipes(true);
    
      this.dataService.load().then((data) => {
        console.log(data)
    
        data.map((question) => {
    
              let originalOrder = question.answers;
              question.answers = this.randomizeAnswers(originalOrder);
              return question;
    
          });		
    
          this.questions = data;
    
      });
    
    }
    
    nextSlide(){
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    }
    
    selectAnswer(answer, question){
    
      this.hasAnswered = true;
      answer.selected = true;
      question.flashCardFlipped = true;
    
      if(answer.correct){
        this.score++;
      }
    
      setTimeout(() => {
        this.hasAnswered = false;
        this.nextSlide();
        answer.selected = false;
        question.flashCardFlipped = false;
      }, 3000);
    }
    
    randomizeAnswers(rawAnswers: any[]): any[] {
    
      for (let i = rawAnswers.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = rawAnswers[i];
          rawAnswers[i] = rawAnswers[j];
          rawAnswers[j] = temp;
      }
    
      return rawAnswers;
    
    }
    
    restartQuiz() {
      this.score = 0;
      this.slides.lockSwipes(false);
      this.slides.slideTo(0, 1000);
      this.slides.lockSwipes(true);
    }
    
      backButton(){
        this.navCtrl.pop();
      }
    
    
    

      
  ngOnInit() {
  }

}
