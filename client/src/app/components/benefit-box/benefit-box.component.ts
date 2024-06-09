import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-benefit-box',
  standalone: true,
  imports: [],
  templateUrl: './benefit-box.component.html',
  styleUrl: './benefit-box.component.scss',
})
export class BenefitBoxComponent {
  @Input() benefit: any;
}
