import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() user: any;

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('currentUser');
    window.location.reload(); // or navigate to login page
  }

  navigateToTheSettingsPage() {
    this.router.navigate(['/settings'])
  }
}
