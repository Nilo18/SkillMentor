import { Component, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BackendUrlHolderService } from '../../services/backend-url-holder.service';

interface Slide {
  image: string,
  text: string
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  constructor(@Inject(PLATFORM_ID) private platformid: Object, private http: HttpClient, private urlHolder: BackendUrlHolderService) {}

  slides: Slide[] = []

  private observer!: IntersectionObserver;
  @ViewChild('sliderRef') slider!: ElementRef

  currentIndex: number = 0;
  intervalId: any
  nextWasClicked: boolean = false; // This flag will be used to avoid auto moving and next button running at the same time
  btnWasClicked: boolean = false // This flag will be used to avoid spam clicking next or prev buttons
  i: number = 1;
  visible: boolean = false; // A flag to control when the component comes into view
  baseURL!: string;
  isLoading: boolean = true;

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

  async ngOnInit() {
    // Make sure that the slider is run only in browser
    this.baseURL = this.urlHolder.getBaseURL();
    try {
      const res = await firstValueFrom(this.http.get<Slide[]>(`${this.baseURL}/slider`))
      this.isLoading = false;
      this.slides = res
    } catch (err) {
      console.log("Failed to fetch slides: ", err)
      throw err
    }

    if (!this.isLoading && isPlatformBrowser(this.platformid)) {
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
