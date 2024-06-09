import { Component, HostBinding, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-statis-box',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './statis-box.component.html',
  styleUrl: './statis-box.component.scss',
})
export class StatisBoxComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() value!: number;
  @Input() backgroundColor!: string;
  @Input() color!: string;
  @Input() redirectTo!: string;

  @HostBinding('class') class = 'statis-box  col l-4 m-6 c-12';
}
