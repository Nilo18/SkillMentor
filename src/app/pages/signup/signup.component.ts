import { Component, ViewChild, ElementRef } from '@angular/core';
import { MentorDatabaseService } from '../../services/mentor-database.service';
import { Router } from '@angular/router';
import { MentorsServiceService } from '../../services/mentors-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private MentorDatabase : MentorDatabaseService, 
  private router: Router, public MentorsService : MentorsServiceService, private auth: AuthService) {}

  name = '';
  email = '';
  password = '';
  specialty = '';
  selectedImg: File | null = null // For backend 
  profileImage: string | ArrayBuffer | null = null; // For preview on the page
  imageUploaded = false;

  nameError = '';
  emailError = '';
  passwordError = '';
  specialtyError = '';
  imageError = '';

  async submitForm() {
    this.resetErrors();
    let valid = true;

    if (!this.name.trim()) {
      this.nameError = 'სახელი სავალდებულოა';
      valid = false;
    }

    if (!this.email.trim() || !this.email.includes('@')) {
      this.emailError = 'გთხოვთ მიუთითეთ სწორი ელ–ფოსტა';
      valid = false;
    }

    if (!this.password || this.password.length < 6) {
      this.passwordError = 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო';
      valid = false;
    }

    if (!this.specialty.trim()) {
      this.specialtyError = 'პროფესია სავალდებულოა';
      valid = false;
    }

    if (!this.imageUploaded) {
      this.imageError = 'გთხოვთ ატვირთეთ პროფილის ფოტო';
      valid = false;
    }

    if (valid) {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('position', this.specialty)
      if (this.selectedImg) {
        formData.append('image', this.selectedImg)
      }
      // const newUser = {
      //   // id: Date.now(),
      //   name: this.name,
      //   email: this.email,
      //   password: this.password,
      //   position: this.specialty,
      //   image: this.profileImage,
      //   // charge: "50",
      //   // experiences: []
      // };

      // this.auth
      // this.MentorDatabase.mentorsBase.push(newUser);
      // console.log(this.MentorDatabase.mentorsBase)

      // // Save updated mentor list
      // localStorage.setItem('mentorsBase', JSON.stringify(this.MentorDatabase.mentorsBase));

      // // Save current user separately
      // localStorage.setItem('currentUser', JSON.stringify(newUser));

      // console.log(this.MentorDatabase.mentorsBase);
      await this.auth.signup(formData)
      this.router.navigate(['']);
      alert('თქვენ წარმატებით გაიარეთ რეგისტრაცია!');
    }
  }

  resetErrors() {
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.specialtyError = '';
    this.imageError = '';
  }

    @ViewChild('fileInput') fileInputRef!: ElementRef;

  selectedFileName: string = '';
  fileError: string = '';

  triggerFileInput() {
    const fileInput = document.getElementById('ProfileImg') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];

    this.fileError = '';
    this.selectedFileName = '';
    this.imageUploaded = false;
    this.profileImage = null;

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'გთხოვთ ატვირთეთ მხოლოდ JPG ან PNG ტიპის სურათი.';
    } else if (file.size > maxSize) {
      this.fileError = 'ფაილი არ უნდა აღემატებოდეს 2MB-ს.';
    } else {
      this.selectedImg = file
      this.selectedFileName = file.name;
      this.imageUploaded = true;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


}

