import { Component, HostListener, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { IndicatorComponent } from "../indicator/indicator.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CardComponent, CommonModule, IndicatorComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  cardImageList: string[] = [
    '../../../assets/cards/SV8pt5_IT_28.png',
    '../../../assets/cards/SV8pt5_IT_32.png',
    '../../../assets/cards/SV8pt5_IT_41.png',
    '../../../assets/cards/SV8pt5_IT_65.png',
    '../../../assets/cards/SV8pt5_IT_168.png',
  ];
  currentImageIndex: number = 0;

  animationClass: string = '';

  timeDelay: number = 500;

  //To set the time delay for the animation in the css
  ngOnInit() {
    this.updateAnimationDuration();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.nextImage();
    }
    if (event.key === 'ArrowLeft') {
      this.previousImage();
    }
  }

  



  updateAnimationDuration() {
    const root = document.documentElement;
    root.style.setProperty('--animation-duration', `${this.timeDelay / 1000}s`);
  }

  previousImage() {
    this.applyAnimationLeft();
    setTimeout(() => {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.cardImageList.length - 1;
      }
    }, this.timeDelay);
  }

  nextImage() {
    this.applyAnimationRight();
    setTimeout(() => {
      if (this.currentImageIndex < this.cardImageList.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    }, this.timeDelay);
  }

  applyAnimationLeft() {
    this.animationClass = 'move-left ';
    setTimeout(() => {
      this.animationClass = 'move-in-from-right';
    }, this.timeDelay);
    setTimeout(() => {
      this.animationClass = '';
    }, this.timeDelay + this.timeDelay);
  }

  applyAnimationRight() {
    this.animationClass = 'move-right ';
    setTimeout(() => {
      this.animationClass = 'move-in-from-left';
    }, this.timeDelay);
    setTimeout(() => {
      this.animationClass = '';
    }, this.timeDelay + this.timeDelay);
  }

}
