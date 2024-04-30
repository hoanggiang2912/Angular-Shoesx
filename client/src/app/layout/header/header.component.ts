import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isOpen!: boolean;

  constructor(private cd: ChangeDetectorRef) {}

  receiveChange($event: boolean) {
    this.isOpen = $event;
    this.cd.detectChanges();
  }

  openSidebar() {
    this.isOpen = true;
    this.cd.detectChanges();
  }
}
