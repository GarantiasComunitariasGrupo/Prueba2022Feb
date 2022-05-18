import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataType } from './app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  #apiPath = 'http://localhost/Prueba2022/private/';

  constructor(
    private http: HttpClient
  ) { }

  get(contoller: string, action: string, parameters = '') {
    return this.http.get(`${this.#apiPath}${contoller}/${action}${parameters}`);
  }

  post(contoller: string, action: string, parameters: Record<string, any> = {}) {
    return this.http.post(`${this.#apiPath}${contoller}/${action}`, parameters);
  }

}

