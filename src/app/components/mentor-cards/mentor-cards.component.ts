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
  animationHasRun: boolean = false;

  constructor(public MentorsService : MentorsServiceService) {}

  async ngOnInit() {
    const res = await this.MentorsService.getMentorsByAmount(8) 
    this.mentors = res.mentorsData // მარტო 8 მენტორს წამოიღებს
  }

  @ViewChild('mentorCardsRef') mentorCards!: ElementRef
  observer!: IntersectionObserver;

  ngAfterViewInit() {
    // Initialize the observer
  this.observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animationHasRun) {
        this.visible = true;
        this.animationHasRun = true
        this.observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });
    this.observer.observe(this.mentorCards.nativeElement) // Observe for the mentorCards native element
  }

  // navigateAndRefresh(mentor: any) {
  //   this.MentorsService.selectMentor(mentor)
  //   window.location.reload()
  // }

  ngOnDestroy() {
    // Check if observer is valid i.e not undefined
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
