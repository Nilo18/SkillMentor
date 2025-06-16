import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MentorDatabaseService } from '../../services/mentor-database.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private MentorDatabase: MentorDatabaseService,
    private router: Router
  ) {}

  login() {
    this.emailError = '';
    this.passwordError = '';

    if (!this.email.trim()) {
      this.emailError = 'გთხოვთ მიუთითეთ ელ–ფოსტა';
      return;
    }

    if (!this.password.trim()) {
      this.passwordError = 'გთხოვთ შეიყვანოთ პაროლი';
      return;
    }

    const storedData = localStorage.getItem('mentorsBase');
    const mentors = storedData ? JSON.parse(storedData) : [];

    const foundUser = mentors.find((mentor: any) =>
      mentor.email === this.email && mentor.password === this.password
    );

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      alert('შესვლა წარმატებით შესრულდა!');
      this.router.navigate(['']);
    } else {
      this.passwordError = 'ელ–ფოსტა ან პაროლი არასწორია';
    }
  }
}
