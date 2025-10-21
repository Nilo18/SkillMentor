import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MentorsComponent } from './pages/mentors/mentors.component';
import { MentorComponent } from './pages/mentor/mentor.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'mentors', component: MentorsComponent },
  { path: 'mentor/:id', component: MentorComponent },
  { path: 'settings/:id', component: SettingsComponent },
  { path: 'verify-email/:token', component: VerifyEmailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
