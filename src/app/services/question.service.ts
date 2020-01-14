import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

	data: any;
	 quiz;
	 category;
	 sub;
	constructor(public http: HTTP) {

	}

	load(){

		if(this.data){
			return Promise.resolve(this.data);
		}

		return new Promise(resolve => {

			console.log(this.category);
			console.log(this.sub);
			console.log(this.quiz);
			this.http.get('./assets/data/quizes/'+this.category+'/'+this.sub+'/'+this.quiz+'.json').map(res => res.json()).subscribe(data => {
			
					this.data=data.questions;
					resolve(this.data);
			
			});

		});

	}


}
