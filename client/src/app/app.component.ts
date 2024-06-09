import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminHeadernavComponent } from './components/admin-headernav/admin-headernav.component';
import { User } from '../types';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminHeadernavComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  showHeaderAndFooter = true;

  title = 'Assignment';

  user!: User;

  isAdmin!: boolean;

  constructor(private route: Router) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = this.user.role === 'admin';
  }

  ngOnInit() {
    if (this.isAdmin) {
      this.route.navigate(['/admin']);
    }

    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showHeaderAndFooter =
          !event.urlAfterRedirects.includes('checkout');
      });
  }
}
