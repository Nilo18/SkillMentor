import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SpamValidatorService } from '../../services/spam-validator.service';

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

  noSpamValidator() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value?.trim()

      return null
    }
  }

  experience: FormGroup; // This will be assigned when the form is built

  // This builds the form and assigns it to a FormGroup
  constructor(private fb: FormBuilder, private SpamValidator: SpamValidatorService) {
    this.experience = fb.group({
      company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]]
    })
  }

  textIsSpammy: boolean = false;

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    const storedMentors = localStorage.getItem('mentorsBase');

    if (storedUser && storedMentors) {
      const mentors = JSON.parse(storedMentors);
      const user = JSON.parse(storedUser);

      // Find the fresh user data inside mentorsBase
      const freshUser = mentors.find((m : any) => m.id === user.id);

      if (freshUser) {
        this.currentUser = freshUser;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      } else {
        this.currentUser = user;
      }

      // Ensure experiences array exists
      if (!this.currentUser.hasOwnProperty('experiences')) {
        this.currentUser.experiences = [];
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
    }
  }

  addExperience() {
    // Show all errors at once instead of separetely
    if (this.experience.invalid) {
      this.experience.markAllAsTouched()
      return // Return to exit the function when showing errors
    }

    const experienceValue = this.experience.value
    console.log('Experience added:', experienceValue);
    // Optionally push this.experience to an array and reset it:
  
    if (!this.SpamValidator.isSpammyText(experienceValue)) {
      this.currentUser.experiences.push({ ...experienceValue })
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.textIsSpammy = false
    } else {
      this.textIsSpammy = true;
    }

    // Retrieve the mentor base
    const stored = localStorage.getItem('mentorsBase');
    this.mentorBaseLocal = stored? JSON.parse(stored) : []

    // Find the current user in the mentor base by index
    const index = this.mentorBaseLocal.findIndex(m => m.id === this.currentUser.id)

    // If the current user was found update it's experiences base on the data current user has provided with
    if (index !== -1) {
      this.mentorBaseLocal[index] = { ...this.currentUser };
      localStorage.setItem('mentorsBase', JSON.stringify(this.mentorBaseLocal))
    }

    // this.experiences.push({ ...this.experience });
    console.log(this.currentUser.experiences)
    this.experience.reset()
  }
}
