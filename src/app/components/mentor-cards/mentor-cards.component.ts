import { Component, ElementRef, ViewChild } from '@angular/core';
import { MentorsServiceService } from '../../services/mentors-service.service';

@Component({
  selector: 'app-mentor-cards',
  templateUrl: './mentor-cards.component.html',
  styleUrl: './mentor-cards.component.scss'
})
export class MentorCardsComponent {
  mentors : any[] = []
  visible: boolean = false

  constructor(public MentorsService : MentorsServiceService) {}

  ngOnInit() {
    this.mentors = this.MentorsService.getMentorsByAmount(8) // მარტო 8 მენტორს წამოიღებს
  }

  @ViewChild('mentorCardsRef') mentorCards!: ElementRef
  observer!: IntersectionObserver;

  ngAfterViewInit() {
    // Initialize the observer
    this.observer = new IntersectionObserver(entries => {
      // For each entry check if it is intersecting
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible = true // If it is mark visible flag as true
          console.log(this.visible)
        }
      })
    }), {
      threshold: 0.3
    }
    this.observer.observe(this.mentorCards.nativeElement) // Observe for the mentorCards native element
  }

  ngOnDestroy() {
    // Check if observer is valid i.e not undefined
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
