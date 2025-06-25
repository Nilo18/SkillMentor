import { Component } from '@angular/core';
import { MentorsServiceService } from '../../services/mentors-service.service';
import { MentorDatabaseService } from '../../services/mentor-database.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.scss'
})
export class MentorsComponent {

  mentors : any[] = []
  newMentors : any[] = []
  typedKeyword: string = '';
  searchKeyword : string = ''
  searchResult : any
  searchResultFound : boolean = false;
  hasBeenSearched : boolean = false;
  databaseMentorsWereAdded : boolean = false;

  constructor(public MentorsService : MentorsServiceService, public MentorDatabase : MentorDatabaseService) {}

  ngOnInit() {
    const stored = localStorage.getItem('mentorsBase')
    if (stored) {
      this.newMentors = JSON.parse(stored)
    }
    this.mentors = this.MentorsService.mentors // აქ ყველა უნდა აჩვენოს
    
    // this.newMentors = this.MentorDatabase.mentorsBase
    for (let newMentor of this.newMentors) {
      const exists = this.mentors.find(mentor => mentor.id === newMentor.id) // Find if a mentor with this id already exists
      // If it doesn't, add them to the local array to display, this process is needed to avoid duplication on the page
      if (!exists) {
        this.mentors.push(newMentor)
      }
    }

    // console.log(this.mentors)
    // console.log(this.newMentors)
  }

  submitSearch() {
    // 1. Clean the keyword first
    const trimmedKeyword = this.typedKeyword.trim(); // Always trim to avoid "" and "  " problems

    // 2. If keyword is empty, don't search — just reset flags
    if (trimmedKeyword === '') {
      this.hasBeenSearched = false;
      this.searchKeyword = '';
      this.searchResultFound = false;
      this.searchResult = null
      this.typedKeyword = ''; // <-- Important!
      return;
    }

    // 3. A keyword exists — mark that a search has been done and the searched keyword becomes the keyword typed in the input field
    this.searchKeyword = trimmedKeyword;
    this.hasBeenSearched = true;

    const keyword = trimmedKeyword.toLowerCase();

    // 4. Search in the mentors list by name or position (or any other field you want)
    const match = this.mentors.find(mentor =>
      mentor.position.toLowerCase().includes(keyword)
    );

    // 5. Update the result accordingly
    if (match) {
      this.searchResult = match;
      this.searchResultFound = true;
    } else {
      this.searchResult = null;
      this.searchResultFound = false;
    }
  }

    onInputChange() {
      if (this.typedKeyword.trim() === '') {
        this.hasBeenSearched = false;
        this.searchKeyword = '';
        this.searchResultFound = false;
        this.searchResult = null;
      }
  }
} 
