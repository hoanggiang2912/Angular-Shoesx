import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
  HostListener,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
} from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';

interface MenuItem {
  label: string;
  icon?: string;
  items?: MenuItem[];
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  items: MenuItem[] = [];

  @Input() isOpen!: boolean;
  @Output() close = new EventEmitter<boolean>();

  @Input() isOpenSearchBox!: boolean;
  @Output() openSearchBox = new EventEmitter<boolean>();

  closeSidebar() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }

  openSearchBoxSidebar() {
    this.isOpenSearchBox = true;
    this.openSearchBox.emit(this.isOpenSearchBox);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeSidebar();
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Shop',
        // icon: 'pi pi-shopping-bag',
        items: [
          {
            label: 'Men',
            route: '/shop/Men',
          },
          {
            label: 'Woman',
            route: '/shop/Woman',
          },
          {
            label: 'Kids',
            route: '/shop/Kids',
          },
        ],
      },
    ];
  }
}
