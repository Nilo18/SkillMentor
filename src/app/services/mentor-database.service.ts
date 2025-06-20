import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MentorDatabaseService {
    mentorsBase: any[] = [];

    constructor() {
      const stored = localStorage.getItem('mentorsBase');
      this.mentorsBase = stored ? JSON.parse(stored) : [];
  }
}
