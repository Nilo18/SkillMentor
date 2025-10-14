import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendUrlHolderService {
  private baseURL = 'https://seefuture-back-a044db68f5d8.herokuapp.com'

  getBaseURL() {
    return this.baseURL
  }

  constructor() { }
}
