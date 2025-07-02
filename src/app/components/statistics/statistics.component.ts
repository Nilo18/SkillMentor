import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements AfterViewInit, OnDestroy {
    targetValues = [20, 800, 30, 1000] // Target values to count up to
    displayedValues = [0, 0, 0, 0] // Initially displayed values
    intervalIds: any[] = []
    duration = 2500; // duration in milliseconds
    animationHasRun: boolean = false;
    visible: boolean = false

    @ViewChild('statsRef') statsRef!: ElementRef // ViewChild access the DOM
    
    private observer!: IntersectionObserver // This will observe whether or not a component is being scrolled into the view

    ngAfterViewInit() {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animationHasRun) {
            this.animationHasRun = true;
            this.visible = true;
            this.startAnimation();
            this.observer.disconnect()
          }
        })
      }, {
        threshold: 0.3 // It will run when 30% of element is visible
      })

      this.observer.observe(this.statsRef.nativeElement)
    }
    // Angular event listener
    // @HostListener('mouseenter')
    // onHover() {
    //   if (this.animationHasRun) {
    //     return;
    //   }
    //   this.animationHasRun = true;
    //   this.startAnimation();
    // }

    startAnimation() {
      this.targetValues.forEach((val, index) => {
        this.animateCountUp(index, 0, val, this.duration);
      })
    }

    animateCountUp(index: number, start: number, target: number, duration: number) {
      const range = target - start;
      const stepTime = 30; // update every 30ms
      const steps = Math.ceil(duration / stepTime); // The amount of times the interval will be increased
      let currentStep = 0;

      const intervalId = setInterval(() => {
        currentStep++;
        this.displayedValues[index] = Math.floor((range * currentStep) / steps);
        if (currentStep >= steps) {
          this.displayedValues[index] = target; // ensure exact target at end
          clearInterval(intervalId);
        }
      }, stepTime);

      this.intervalIds.push(intervalId)
    }

    ngOnDestroy() {
      this.intervalIds.forEach(id => clearInterval(id))
      if (this.observer) {
        this.observer.disconnect()
      }
    }
}
