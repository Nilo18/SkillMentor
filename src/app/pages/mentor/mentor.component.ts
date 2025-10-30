import { Component } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Experience, MentorsServiceService } from '../../services/mentors-service.service';
import { jwtDecode } from 'jwt-decode';

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
  isLoading: boolean = true
  decodedToken!: any
  experiencesLocal: Experience[] = []

  constructor (private route: ActivatedRoute, private mentorsService: MentorsServiceService) {}

  async ngOnInit() {
    const token = this.mentorsService.retrieveToken()
    if (token) {
      this.decodedToken = jwtDecode<any>(token)
    }
    this.route.params.subscribe(async (params) => {
      try {
        const id = params['id'];
        this.selectedMentor = await this.mentorsService.getMentorById(id); 
        // Copy the experiences to a local array and iterate over that later on in HTML
        // This will allow for live removal of experiences from the page without using websockets or observables
        // One potential downside to this could've been that there might've been too many experiences
        // which would overload the local array, but a single mentor will have to pin only 3 of their top experiences
        // on the page (Similar to how GitHub pins only 6 repos on the profile page)
        this.experiencesLocal = this.selectedMentor.experiences
        // Toggle X Icon on the experiences, if the logged in user is viewing their own page, they should be able to see it
        // So they can delete it if they would like to
        if (this.decodedToken && this.selectedMentor.id === this.decodedToken.id) {
          this.shouldBeAbleToDelete = true
        } else {
          this.shouldBeAbleToDelete = false
        }
        console.log(this.selectedMentor)
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    });
  }

  async removeExperience(experienceId: any) {
    const mentorId = this.selectedMentor._id
    // Remove the experience both from the local array and the database
    const indexToRemove = this.experiencesLocal.findIndex(experience => experience._id === experienceId)
    this.experiencesLocal.splice(indexToRemove, 1)
    await this.mentorsService.removeMentorExperience(mentorId, experienceId)
  }
}
