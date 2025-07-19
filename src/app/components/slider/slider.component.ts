import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  slides: any[] = [
    {
      img: 'assets/slide1.png',
      text: 'მოძებნე მენტორი რომლის ინტერესებშიც შენი განვითარება შედის.'
    },
    {
      img: 'assets/slide2.png',
      text: 'ექსპერტები პროგრამირებაში, დიზაინში, ბიზნესში და მრავალ თანამედროვე პროფესიაში.'
    }
    
  ]

  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}

  currentIndex: number = 0;
  intervalId: any

  next() {
    this.currentIndex = (this.currentIndex === this.slides.length - 1)? 0 : this.currentIndex + 1
  }
 
  prev() {
    this.currentIndex = (this.currentIndex === 0)? this.slides.length - 1 : this.currentIndex - 1;
  }

  autoMoveSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000)
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformid)) {
      this.autoMoveSlide()
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
