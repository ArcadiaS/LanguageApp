import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://istantbul.com/api';
  AUTH_URL = 'http://istantbul.com/';

  constructor() { }
}
