import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SpamValidatorService } from '../../services/spam-validator.service';
import { Mentor, MentorsServiceService } from '../../services/mentors-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  experiences : any[] = []
  mentorBaseLocal : any[] = []
  currentUser: any
  currentUserInDatabase : any

  noSpamValidator() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value?.trim()

      return null
    }
  }

  experience: FormGroup; // This will be assigned when the form is built

  // This builds the form and assigns it to a FormGroup
  constructor(private fb: FormBuilder, private SpamValidator: SpamValidatorService,
    private mentors: MentorsServiceService, private route: ActivatedRoute) {
    this.experience = fb.group({
      company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]]
    })
  }

  textIsSpammy: boolean = false;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      const res = await this.mentors.getMentorById(id)
      console.log(res)
      this.currentUser = res
    }
  }

  async addExperience() {
    // Show all errors at once instead of separetely
    if (this.experience.invalid) {
      this.experience.markAllAsTouched()
      return // Return to exit the function when showing errors
    }

    const experienceValue = this.experience.value
    console.log('Experience added:', experienceValue);
    await this.mentors.addMentorExperience(this.currentUser._id, experienceValue)
  }
}
