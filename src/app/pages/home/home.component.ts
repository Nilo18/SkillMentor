import { Component } from '@angular/core';
import { MentorDatabaseService } from '../../services/mentor-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loggedInUser: any = null; // should be a single object, not an array

  constructor(private MentorDatabase: MentorDatabaseService) {}

  ngOnInit() {
    const stored = localStorage.getItem('currentUser');
    this.loggedInUser = stored ? JSON.parse(stored) : null;
    console.log(this.loggedInUser)
  }
}
