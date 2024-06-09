import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { sortOption } from '../../../types';

@Component({
  selector: 'app-shop-bar',
  standalone: true,
  imports: [DropdownModule, CommonModule],
  templateUrl: './shop-bar.component.html',
  styleUrl: './shop-bar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ShopBarComponent {
  isShowFilterBar: boolean = true;
  @Output() toggle = new EventEmitter<boolean>();

  options: sortOption[] = [];
  selectedOption: sortOption = this.options.at(0)!;

  toggleFilterBar() {
    this.isShowFilterBar = !this.isShowFilterBar;
    this.toggle.emit(this.isShowFilterBar);
  }

  ngOnInit() {
    this.options = [
      {
        name: 'All',
      },
      {
        name: 'By name',
      },
      {
        name: 'By price',
      },
      {
        name: 'By rating',
      },
      {
        name: 'By popularity',
      },
    ];
  }
}
