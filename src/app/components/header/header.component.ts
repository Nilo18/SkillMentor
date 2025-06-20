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

  ngOnInit() {
    // Make sure the localStorage and the input are not in conflict
    if (!this.user) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.user = JSON.parse(stored);
      }
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.reload(); // or navigate to login page
  }

  navigateToTheSettingsPage() {
    this.router.navigate(['/settings'])
  }
}
