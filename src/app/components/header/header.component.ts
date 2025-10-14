import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userImage: any;
  accessToken: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Make sure the localStorage and the input are not in conflict
    const stored = localStorage.getItem('seefAccessToken')
    this.accessToken = stored ? stored : null
    if (this.accessToken) {
      const decoded = jwtDecode<any>(this.accessToken)
      console.log('Decoded access token: ', decoded)
      this.userImage = decoded.image
      console.log(this.userImage)
    } else {
      console.log('Token was not found in localStorage')
    }
    // if (!this.user) {
    //   const stored = localStorage.getItem('currentUser');
    //   if (stored) {
    //     this.user = JSON.parse(stored);
    //   }
    // }
  }

  logout() {
    localStorage.removeItem('seefAccessToken');
    window.location.reload(); // or navigate to login page
  }

  navigateToTheSettingsPage() {
    this.router.navigate(['/settings'])
  }
}
