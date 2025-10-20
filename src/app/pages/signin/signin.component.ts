import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MentorDatabaseService } from '../../services/mentor-database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  errMsg: string = ''
  gotSigninError: boolean = false;
  signin!: FormGroup
  shouldAppearDisabled: boolean = false // Flag to control sign in button styling while the login request is being sent

  constructor(
    private MentorDatabase: MentorDatabaseService,
    private router: Router,
    private fb: FormBuilder ,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.signin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })  

    // Disable backend errors on input field changes
    this.signin.valueChanges.subscribe(() => {
      this.gotSigninError = false;
      this.errMsg = ''
    })
  }

  get email() {
    return this.signin.get('email')!
  }

  get password() {
    return this.signin.get('password')!
  }

  get emailError() {
    if (this.email?.hasError('required')) return 'ელ–ფოსტა სავალდებულოა'
    if (this.email?.hasError('email')) return 'გთხოვთ შეიყვანოთ სწორი ელ–ფოსტა.'
    return ''
  }

  get passwordError() {
    if (this.password?.hasError('required')) return 'პაროლი სავალდებულოა.'
    if (this.password?.hasError('minlength')) return 'პაროლი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს.'
    return ''
  }

  async login() {
    this.gotSigninError = false;
    this.errMsg = ''

    if (this.signin.invalid) {
      this.signin.markAllAsTouched()
      console.log('Form is invalid')
      return
    }

    try {
      console.log(this.signin.value)
      this.shouldAppearDisabled = true;
      const accessToken = await this.auth.login(this.signin.value.email, this.signin.value.password)
      console.log("Access token in login component: ", accessToken);
      localStorage.setItem('seefAccessToken', JSON.stringify(accessToken))
      this.router.navigate(['/'])
    } catch(err: any) {
      console.log("Couldn't sign in: ", err);
      this.gotSigninError = true;
      this.shouldAppearDisabled = false
      this.errMsg = err.error.message
    }
  }
}
