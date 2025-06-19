import { Component } from '@angular/core';
import { MentorsServiceService } from '../../services/mentors-service.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.scss'
})
export class MentorsComponent {

  mentors : any[] = []
  searchKeyword : string = ''
  searchResult : any
  searchResultFound : boolean = false;
  hasBeenSearched : boolean = false;

  constructor(public MentorsService : MentorsServiceService) {}

  ngOnInit() {
    this.mentors = this.MentorsService.mentors // აქ ყველა უნდა აჩვენოს
  }

  submitSearch() {
    // console.log(this.searchKeyword);
    if (!this.hasBeenSearched) {
      this.searchResult = this.MentorsService.searchMentorByPosition(this.searchKeyword);
      this.searchResult ? this.searchResultFound = true : this.searchResultFound = false
      this.hasBeenSearched = true
      console.log(this.searchResult)
      console.log(this.searchResultFound)
    } else {
      this.hasBeenSearched = false;
    }

  }
} 
