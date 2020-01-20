import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  
  token: any;
  httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
    };

  constructor(private env: EnvService, private http: HttpClient, private storage: Storage, public authService: AuthenticationService) { 
  }



  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getCourses(): Observable<any> {
    
    this.httpOptions = this.authService.getHeaders();

    return this.http.get(this.env.API_URL+'/courses', this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getLessons(course_id): Observable<any> {
    
    this.httpOptions = this.authService.getHeaders();

    return this.http.get(this.env.API_URL+'/courses/'+course_id+'/lessons', this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


}
