import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [RatingModule, CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: any;

  @HostBinding('class') class = 'comment col l-4 m-6 c-12';
}
