import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTiltModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() imageSrc: string = '';
  @Input() animationClass: string = '';

  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

  private hammerManager!: HammerManager;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.hammerManager = new Hammer.Manager(this.el.nativeElement);
    this.hammerManager.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    );

    this.hammerManager.on('pan', (event) => {
      const rotation = event.deltaX / 15;
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        `translate(${event.deltaX}px, ${
          event.deltaY / 5
        }px) rotate(${rotation}deg)`
      );

      this.el.nativeElement.style.setProperty(
        '--translate-x-start',
        `${event.deltaX}px`
      );
      this.el.nativeElement.style.setProperty(
        '--rotation',
        `${rotation > 30 ? 30 : rotation}deg`
      );
    });

    this.hammerManager.on('panend', () => {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translate(0, 0)'
      );
    });
  }
}
