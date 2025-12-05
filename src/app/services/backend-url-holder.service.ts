import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendUrlHolderService {
  private baseURL = 'https://skillmentor-back.onrender.com'

  getBaseURL() {
    return this.baseURL
  }

  constructor() { }
}
