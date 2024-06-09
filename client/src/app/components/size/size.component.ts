import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [],
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss'
})
export class SizeComponent {
  @Input() size!: string;
}
