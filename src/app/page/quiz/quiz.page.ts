import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from './../../services/question.service';
import { Component, OnInit, ViewChildren, ViewChild, Input } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {


  @ViewChild('slides', { static: true }) slides: any;

  @Input('isFlipped') flipCard: boolean;
  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  hasAnswered: boolean = false;
  score: number = 0;
  slideOptions: any;
  questions: any;

  image = {
    src: 'https://via.placeholder.com/550'
  };
  constructor(public dataService: QuestionService, public nav: NavController,
     private http: HttpClient, private nativeHttp: HTTP, private loadingCtrl: LoadingController) 
    {

    }
    
  ngOnInit() {
    console.log('init')
  }
    ionViewDidEnter() {
      this.getQuestions();
      this.slides.lockSwipes(true);
    
    }

    async getQuestions(){
      let loading = await this.loadingCtrl.create();
      await loading.present();
      this.http.get('./assets/data/quizes/gaming/desktop/quiz.json').pipe(
        finalize(() => loading.dismiss())
      )
      .subscribe(data => {
        this.questions = data.questions;
        console.log('questions', this.questions)
      }, err => {
        console.log(err)
      })

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
      this.nav.navigateRoot(['tabs/courses', 1, 'lesson', 1])
    }
    
      backButton(){
        this.nav.pop();
      }
    
    
    

      

}
