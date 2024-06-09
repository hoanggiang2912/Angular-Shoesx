import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  constructor(private UserService: UserService) {}

  logout() {
    this.UserService.logout();
  }

  sidebarItems = [
    {
      icon: 'flaticon-025-dashboard',
      title: 'Dashboard',
      link: '/admin/dashboard',
    },
    {
      icon: 'flaticon-050-info',
      title: 'Categories',
      link: '/admin/categories',
    },
    { icon: 'flaticon-041-graph', title: 'Products', link: '/admin/products' },
    { icon: 'flaticon-086-star', title: 'Users', link: '/admin/users' },
    { icon: 'flaticon-045-heart', title: 'Orders', link: '/admin/orders' },
    {
      icon: '',
      title: 'Logout',
      handler: () => {
        this.logout();
      },
    },
  ];
}
