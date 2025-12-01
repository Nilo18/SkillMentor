import { Component, ViewChild, ElementRef } from '@angular/core';
import { MentorDatabaseService } from '../../services/mentor-database.service';
import { Router } from '@angular/router';
import { MentorsServiceService } from '../../services/mentors-service.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private MentorDatabase : MentorDatabaseService, 
  private router: Router, public MentorsService : MentorsServiceService, private auth: AuthService,
  private fb: FormBuilder) {}

  signup!: FormGroup;
  selectedImg: File | null = null // For backend 
  profileImage: string | ArrayBuffer | null = null; // For preview on the page
  imageUploaded = false;

  imageError = '';
  sameEmailError = ''

  ngOnInit() {
    this.signup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      specialty: ['', [Validators.required]]
    })
  }

  get name() {
    return this.signup.get('name')!
  }

  get email() {
    return this.signup.get('email')!
  }

  get password() {
    return this.signup.get('password')!
  }

  get specialty() {
    return this.signup.get('specialty')!
  }

  get nameError() {
    if (this.name?.hasError('required')) return 'სახელი სავალდებულოა.'
    else if (this.name?.hasError('minlength')) return 'სახელი უნდა შედგებოდეს მინუმუმ 3 სიმბოლოსგან.'
    return ''
  }

  emailError(sameEmailErr?: string) {
    if (this.email?.hasError('required')) return 'ელ–ფოსტა სავალდებულოა.'
    else if (this.email?.hasError('email')) return 'გთხოვთ შეიყვანეთ სწორი ელ–ფოსტა.'
    else if (this.sameEmailError) return this.sameEmailError
    return ''
  }

  get passwordError() {
    if (this.password?.hasError('required')) return 'პაროლი სავალდებულოა.'
    else if (this.password?.hasError('minlength')) return 'პაროლი უნდა შედგებოდეს მინუმუმ 3 სიმბოლოსგან.'
    return ''
  }

  get specialtyError() {
    if (this.specialty?.hasError('required')) return 'პროფესია სავალდებულოა.'
    return ''
  }

  async submitForm() {
    console.log("I'm running")
      if (this.signup.invalid) {
        console.log('Form is invalid')
        this.signup.markAllAsTouched();
        return
      }

      console.log('The suggested data is: ', this.signup.value)
      const formData = new FormData()
      formData.append('name', this.signup.value.name)
      formData.append('email', this.signup.value.email)
      formData.append('password', this.signup.value.password)
      formData.append('position', this.signup.value.specialty)
      if (this.selectedImg) {
        formData.append('image', this.selectedImg)
        console.log('The suggested image is: ', this.selectedImg)
      } else {
        this.fileError = 'გთხოვთ ატვირთეთ მხოლოდ JPG ან PNG ტიპის სურათი.';
      }

      try {
        console.log('Initiating sign up...')
        await this.auth.signup(formData)
      } catch (err: any) {
        this.sameEmailError = err.error.message
        return
      }
      
      // this.router.navigate(['']);
      alert('თქვენ წარმატებით გაიარეთ რეგისტრაციის პირველი ეტაპი, გთხოვთ შეამოწმოთ ელ–ფოსტა.');
  }

  @ViewChild('fileInput') fileInputRef!: ElementRef;

  selectedFileName: string = '';
  fileError: string = '';

  triggerFileInput() {
    const fileInput = document.getElementById('ProfileImg') as HTMLInputElement;
    fileInput?.click();
  }

  // *** Come back here if something goes wrong on sign up page image upload ***
  toggleImageError(file: File | null) {
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    console.log(this.fileError)

    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'გთხოვთ ატვირთეთ მხოლოდ JPG ან PNG ტიპის სურათი.';
      console.log(this.fileError)
    }
    
    if (file.size > maxSize) {
      this.fileError = 'ფაილი არ უნდა აღემატებოდეს 2MB-ს.';
      console.log(this.fileError)
    } 
    
    // else {
      this.selectedImg = file
      this.selectedFileName = file.name;
      this.imageUploaded = true;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    // }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];

    this.fileError = '';
    this.selectedFileName = '';
    this.imageUploaded = false;
    this.profileImage = null;

    this.toggleImageError(file)
  }
}
