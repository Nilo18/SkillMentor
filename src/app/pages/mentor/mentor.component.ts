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
  // descriptionIsLong : boolean = false;
  shouldBeAbleToDelete : boolean = false // A flag to control the data which the current user is supposed to delete
  experienceWasDeleted : boolean = false
  currentUser : any;
  mentorsBaseLocal : any[] = []
  // isLoading

  constructor (private route: ActivatedRoute, private mentorsService: MentorsServiceService) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];

      this.selectedMentor = await this.mentorsService.getMentorById(id); // This method unites newly registered mentors and fake mentors to search by id

      const stored = localStorage.getItem('currentUser')
      this.currentUser = stored ? JSON.parse(stored) : null
      if (this.currentUser !== null) {
        this.shouldBeAbleToDelete = this.currentUser.id === this.selectedMentor.id 
      }

      console.log('The selected mentor is: ', this.selectedMentor)
      console.log('His profile image is: ', this.selectedMentor.image)
      console.log(JSON.parse(localStorage.getItem('currentUser') ?? 'null'));
    });
  }

  // removeExperience(index: number) {
  //   if (this.shouldBeAbleToDelete && index !== -1 && index < this.currentUser.experiences.length) {
  //     this.currentUser.experiences.splice(index, 1);
  //     localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

  //     const userIndex = this.mentorsBaseLocal.findIndex(m => m.id === this.currentUser.id)
  //     if (userIndex !== -1) {
  //       this.mentorsBaseLocal[userIndex] = this.currentUser
  //       localStorage.setItem('mentorsBase', JSON.stringify(this.mentorsBaseLocal))
  //     }
  //     this.experienceWasDeleted = true;
  //     console.log("Experience was deleted successfully")
  //   } else {
  //     this.experienceWasDeleted = false;
  //     console.log("Experience was not deleted because conditions are not met")
  //   }
  //   console.log("I work, " + `Here is the index I was given: ${index}`)
  // }
}
