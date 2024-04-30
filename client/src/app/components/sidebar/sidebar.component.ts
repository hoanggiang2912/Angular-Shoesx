import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isOpen!: boolean;
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(private cd: ChangeDetectorRef) {}

  closeSidebar() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.cd.detectChanges();
  }
}
