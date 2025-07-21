import { Component, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
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
      text: 'ექსპერტები პროგრამირებაში, დიზაინში, ბიზნესში და მრავალ თანამედროვე სპეციალობაში.'
    },
    {
      img: 'assets/slide3.png',
      text: 'სამი მარტივი ნაბიჯი: მოძებნე, დაჯავშნე, მიიღე სარგებლიანი რჩევა.'
    },
    {
      img: 'assets/slide4.jpg',
      text: 'განავითარე უნარები და მიიღე რჩევები, რომლებიც მართლა მუშაობს.'
    },
  ]

  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}
  private observer!: IntersectionObserver;
  @ViewChild('sliderRef') slider!: ElementRef

  currentIndex: number = 0;
  intervalId: any
  nextWasClicked: boolean = false; // This flag will be used to avoid auto moving and next button running at the same time
  btnWasClicked: boolean = false // This flag will be used to avoid spam clicking next or prev buttons
  i: number = 1;
  visible: boolean = false; // A flag to control when the component comes into view

  next() {
    if (!this.btnWasClicked) {
      this.currentIndex = (this.currentIndex === this.slides.length - 1)? 0 : this.currentIndex + 1;
      this.nextWasClicked = true;
      this.btnWasClicked = true;

      setTimeout(() => {
        this.btnWasClicked = false; // Reset the flag after 1 second
      }, 1000)
    }
  }
 
  prev() {
    if (!this.btnWasClicked) {
      this.currentIndex = (this.currentIndex === 0)? this.slides.length - 1 : this.currentIndex - 1;
      this.btnWasClicked = true;

      setTimeout(() => {
        this.btnWasClicked = false;
      }, 1000)
    }
      
  }

  autoMoveSlide() {
    this.intervalId = setInterval(() => {
      // Check if next button was clicked
      if (!this.nextWasClicked) {
        this.next(); // If it wasn't move to the next slide automatically
      }

      this.nextWasClicked = false; // Reset the nextWasClicked flag at the end of each auto move
    }, 3000)
  }

  ngOnInit() {
    // Make sure that the slider is run only in browser
    if (isPlatformBrowser(this.platformid)) {
      this.autoMoveSlide()
    }
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible = true;
        }
      })
    }), {
      treshold: 0.3
    }
    this.observer.observe(this.slider.nativeElement)
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
