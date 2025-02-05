import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-stack.component.html',
  styleUrl: './card-stack.component.css',
})
export class CardStackComponent implements OnChanges {
  @Input() cardImageList: string[] = [];
  @Input() currentImage: number = 0;

  newCardList: string[] = [];

  ngOnChanges() {
    this.reorderCards();
    this.setRandomTransformations();
  }

  reorderCards() {
    if (this.cardImageList.length > 0) {
      const start = this.currentImage + 1;
      const end = this.cardImageList.length;
      this.newCardList = [
        ...this.cardImageList.slice(start, end),
        ...this.cardImageList.slice(0, start - 1)
      ];
    }
  }

  setRandomTransformations() {
    const root = document.documentElement;
  
    for (let i = 1; i <= 4; i++) {
      const rotateValue = Math.floor(Math.random() * 20) - 10;
      const translateXValue = Math.floor(Math.random() * 40) - 20;
  
      root.style.setProperty(`--rotate-${i}`, `${rotateValue}deg`);
      root.style.setProperty(`--translate-x-${i}`, `${translateXValue}px`);
    }
  }
}
