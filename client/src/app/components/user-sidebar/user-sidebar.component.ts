import { UserService } from './../../services/user.service';
import { Component, Input } from '@angular/core';
import { SidebarOption, User } from '../../../types';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss',
})
export class UserSidebarComponent {
  @Input() user!: User;

  sidebarOptions!: SidebarOption[];

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  logout() {
    this.UserService.logout();
    console.log('Logged out');
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.sidebarOptions = [
      {
        name: 'Profile',
        icon: 'pi pi-user',
        route: '/user/profile',
      },
      {
        name: 'Orders',
        icon: 'pi pi-file-check',
        route: '/user/orders',
      },
      {
        name: 'Forgot password',
        icon: 'pi pi-info-circle',
        route: '/user/forgot-password',
      },
      {
        name: 'Logout',
        icon: 'pi pi-sign-out',
        route: '/',
        type: 'danger',
        handler: () => this.logout(),
      },
    ];
  }
}
