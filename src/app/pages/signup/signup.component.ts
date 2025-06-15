import { Component, ViewChild, ElementRef } from '@angular/core';
import { MentorDatabaseService } from '../../services/mentor-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private MentorDatabase : MentorDatabaseService, private router: Router) {}

  name = '';
  email = '';
  password = '';
  specialty = '';
  profileImage: string | ArrayBuffer | null = null;
  imageUploaded = false;

  nameError = '';
  emailError = '';
  passwordError = '';
  specialtyError = '';
  imageError = '';

  submitForm() {
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
      this.MentorDatabase.mentorsBase.push({
        name: this.name,
        email: this.email,
        password: this.password,
        specialty: this.specialty,
        profileImg: this.profileImage
      });

      localStorage.setItem('mentorsBase', JSON.stringify(this.MentorDatabase.mentorsBase));
      console.log(this.MentorDatabase.mentorsBase)
      this.router.navigate(['']);
      alert('წარმატებით გაიარეთ რეგისტრაცია!');
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

