import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MentorDatabaseService {

  constructor() { }

  mentorsBase: any[] = []
}
