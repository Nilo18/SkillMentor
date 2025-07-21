import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  visible: boolean = false;

  @ViewChild('bannerRef') banner!: ElementRef
  observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible = true;
        }
      })
    }), {
      threshold: 0.3
    }

    this.observer.observe(this.banner.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
