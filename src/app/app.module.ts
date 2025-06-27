import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { MentorCardComponent } from './components/mentor-card/mentor-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MentorsComponent } from './pages/mentors/mentors.component';
import { MentorComponent } from './pages/mentor/mentor.component';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { MentorCardsComponent } from './components/mentor-cards/mentor-cards.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    MentorCardComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    MentorsComponent,
    MentorComponent,
    SettingsComponent,
    MentorCardsComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
