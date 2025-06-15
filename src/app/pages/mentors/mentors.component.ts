import { Component } from '@angular/core';
import { MentorsServiceService } from '../../services/mentors-service.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.scss'
})
export class MentorsComponent {

  mentors : any[] = []

  constructor(public MentorsService : MentorsServiceService) {}

  ngOnInit() {
    this.mentors = this.MentorsService.mentors // აქ ყველა უნდა აჩვენოს
  }


}
