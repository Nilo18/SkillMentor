import { Component } from '@angular/core';
import { MentorsServiceService } from '../../services/mentors-service.service';

@Component({
  selector: 'app-mentor-cards',
  templateUrl: './mentor-cards.component.html',
  styleUrl: './mentor-cards.component.scss'
})
export class MentorCardsComponent {
  mentors : any[] = []

  constructor(public MentorsService : MentorsServiceService) {}

  ngOnInit() {
    this.mentors = this.MentorsService.getMentorsByAmount(8) // მარტო 10 მენტორს წამოიღებს
  }
}
