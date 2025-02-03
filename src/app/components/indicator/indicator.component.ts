import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicator.component.html',
  styleUrl: './indicator.component.css'
})
export class IndicatorComponent {
  @Input() cardImageList: string[] = [];
  @Input() currentImage: number = 0;

}
