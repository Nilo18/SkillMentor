import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {}
  errMsg: string = ''

  async ngOnInit() {
    const verTokenId = this.route.snapshot.paramMap.get('token')
    console.log('verToken id is: ', verTokenId)
    if (verTokenId) {
      try {
        const res = await this.auth.verifyEmail(verTokenId) 
        localStorage.setItem('seefAccessToken', res)
        this.router.navigate(['/'])
      } catch (err: any) {
        this.errMsg = err.error.message
        console.log(this.errMsg)  
      }
    } 
    else {
      console.log('Invalid ver token id.')
    } 
  }
}
