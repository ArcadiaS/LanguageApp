import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://language.test/api';
  AUTH_URL = 'http://language.test/';

  constructor() { }
}
