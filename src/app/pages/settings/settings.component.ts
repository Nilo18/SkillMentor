import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  experiences : any[] = []
  mentorBaseLocal : any[] = []
  currentUser : any
  currentUserInDatabase : any

  experience = {
    company: '',
    position: '',
    description: ''
  };

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);

        // If the currentUser doesn't have experiences array, add it
          if (!this.currentUser.hasOwnProperty('experiences')) {
            this.currentUser.experiences = [];
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          }
      }
  }

  addExperience() {
    console.log('Experience added:', this.experience);
    // Optionally push this.experience to an array and reset it:
    this.currentUser.experiences.push({ ...this.experience })
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    // Retrieve the mentor base
    const stored = localStorage.getItem('mentorsBase');
    this.mentorBaseLocal = stored? JSON.parse(stored) : []

    const index = this.mentorBaseLocal.findIndex(m => m.id === this.currentUser.id)
    // Find the current user in the mentor base
    // this.currentUserInDatabase = this.mentorBaseLocal.find(mentor => mentor.id === this.currentUser.id)
    // If the current user was found update it's experiences base on the data current user has provided with
    if (index !== -1) {
      this.mentorBaseLocal[index] = { ...this.currentUser };
      localStorage.setItem('mentorsBase', JSON.stringify(this.mentorBaseLocal))
    }

    
    // this.experiences.push({ ...this.experience });
    console.log(this.currentUser.experiences)
    // localStorage.setItem('exp')
    this.experience = { company: '', position: '', description: '' };
  }
}
