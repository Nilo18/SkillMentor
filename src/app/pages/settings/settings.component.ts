import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  experiences : any[] = []
  currentUser : any

  experience = {
    company: '',
    position: '',
    description: ''
  };

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
  }

  addExperience() {
    console.log('Experience added:', this.experience);
    // Optionally push this.experience to an array and reset it:
    this.experiences.push({ ...this.experience });
    this.experience = { company: '', position: '', description: '' };
  }
}
