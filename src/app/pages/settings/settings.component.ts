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
  shouldEdit: boolean[] = [false, false, false, false]
  newName: string = ''
  newEmail: string = ''
  newPassword: string = ''
  newSpecialty: string = ''
  addedMsg: string = ''
  errMsg: string = ''
  gotErr: boolean = false;
  allowedImgTypes: string[] = ['image/jpg', 'image/jpeg', 'image/png']
  maxFileSize: number = 2 * 1024 * 1024
  newProfileImage: File | null = null
  isLoading: boolean = true

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
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      isOnTop: [false, Validators.required]
    })
  }

  textIsSpammy: boolean = false;

  // showTop() {
  //   console.log("isOnTop's value is: " + this.experience.value.isOnTop)
  // }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      const res = await this.mentors.getMentorById(id)
      console.log(res)
      this.currentUser = res
      this.newName = this.currentUser.name
      this.newEmail = this.currentUser.email
      this.newPassword = this.currentUser.password
      this.newSpecialty = this.currentUser.position
      this.isLoading = false
    }
  }

  async addExperience() {
    // Reset messages
    this.addedMsg = '';
    this.errMsg = '';
    this.gotErr = false;

    // Show all errors at once
    if (this.experience.invalid) {
      this.experience.markAllAsTouched();
      return;
    }

    try {
      const experienceValue = this.experience.value;
      console.log('Experience added:', experienceValue);

      const res = await this.mentors.addMentorExperience(
        this.currentUser._id,
        experienceValue
      );

      const stored = localStorage.getItem('availableTopSlots');
      let topSlots: number | null = stored ? JSON.parse(stored) : null;

      // Prevent data mismatch
      if (res && typeof topSlots === 'number' && topSlots > 0) {
        topSlots--;
        localStorage.setItem('availableTopSlots', JSON.stringify(topSlots));
      }

      if (res) {
        this.addedMsg = 'წარმატებით დაემატა!';
        setTimeout(() => {
          this.addedMsg = '';
        }, 2000);
      }

    } catch (error) {
      console.log("Couldn't add experience:", error);
      this.gotErr = true;
      this.errMsg = 'დამატებისას მოხდა შეცდომა.';

      setTimeout(() => {
        this.errMsg = '';
        this.gotErr = false;
      }, 2000);
    }
  }

  async editProfile(mentorId: string, property: string, replacement: any) {
    const formData = new FormData()
    formData.append('mentorId', mentorId)
    formData.append('property', property)
    formData.append('replacement', replacement)
    if (property === 'image' && this.newProfileImage)  {
      formData.append('image', this.newProfileImage)
      const res = await this.mentors.editMentorProfile(formData)
      console.log(res)
      localStorage.setItem('seefAccessToken', JSON.stringify(res.accessToken))
      window.location.reload()
      // const newProfileImage = res.newImage
      // console.log(newProfileImage)
      return  
    //  emit the new profile image to the header
    }

    if (property && replacement) {
      const res = await this.mentors.editMentorProfile(formData)
      console.log(res)  
      localStorage.setItem('seefAccessToken', JSON.stringify(res.accessToken))
      window.location.reload()
    } else {
      console.log("Invalid property and replacement.")
    }
  }

  edit(index: number) {
    if (index !== -1 && index < this.shouldEdit.length) {
      this.shouldEdit[index] = !this.shouldEdit[index]
    }
  }

  triggerImageUpload() {
    const input = document.getElementById('userInfo__ProfImg__Input') as HTMLInputElement
    input?.click()
  }

  async changeProfileImage(event: Event, mentorId: string) {
    const input = event.target as HTMLInputElement
    const file = input.files && input.files[0]
    console.log(file)
    console.log(file?.name)
    console.log(file?.type)
    console.log(mentorId)

    if (file && !this.allowedImgTypes.includes(file?.type)) {
      console.log('This type of file is not allowed.')
      return;
    }

    if (file && file?.size > this.maxFileSize) {
      console.log('The file size exceeds max capacity allowed.')
      return
    }

    // let newProfileImage
    // const reader = new FileReader()
    // reader.onload = () => {
    //   this.newProfileImage = reader.result
    // }
    // reader.readAsDataURL(file)
    this.newProfileImage = file
    console.log("The new profile image was read as: ",  this.newProfileImage)
    await this.editProfile(mentorId, 'image', 'none')
  }
}
