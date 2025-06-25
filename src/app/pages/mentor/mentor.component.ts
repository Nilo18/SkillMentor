import { Component } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MentorsServiceService } from '../../services/mentors-service.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrl: './mentor.component.scss'
})
export class MentorComponent {
  selectedMentor: any;

  constructor (private route: ActivatedRoute, private mentorsService: MentorsServiceService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.selectedMentor = this.mentorsService.getMentorById(id); // This method unites newly registered mentors and fake mentors to search by id
      console.log(this.selectedMentor)
      console.log(JSON.parse(localStorage.getItem('currentUser') ?? 'null'));
      console.log(JSON.parse(localStorage.getItem('mentorsBase')?? 'null'));
    });
  }
}
