import { ProductsService } from './../../../services/products.service';
import { CategoriesService } from './../../../services/categories.service';
import { BillService } from './../../../services/bill.service';
import { UserService } from './../../../services/user.service';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { PreloaderComponent } from '../../../components/preloader/preloader.component';
import { AdminHeadernavComponent } from '../../../components/admin-headernav/admin-headernav.component';
import { AdminHeaderComponent } from '../../../components/admin-header/admin-header.component';
import { AdminFooterComponent } from '../../../components/admin-footer/admin-footer.component';
import { Title } from '@angular/platform-browser';
import { StatisBoxComponent } from '../../../components/statis-box/statis-box.component';
import { ChartModule } from 'primeng/chart';
import { Bill, Category, Product, User } from '../../../../types';
import { CATEGORIES_URL, PRODUCTS_URL } from '../../../../env';
import { Data, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzLayoutModule,
    CommonModule,
    AdminSidebarComponent,
    PreloaderComponent,
    AdminHeadernavComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    StatisBoxComponent,
    ChartModule,
    LoaderComponent,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  isLoading: boolean = false;

  statistics!: any[];

  data: any;

  options: any;

  users!: User[];

  bills!: Bill[];

  categories!: Category[];

  products!: Product[];

  constructor(
    private UserService: UserService,
    private BillService: BillService,
    private ProductsService: ProductsService,
    private CategoriesService: CategoriesService
  ) {}

  async getBills() {
    this.BillService.getBills().subscribe({
      next: (bills: any) => {
        this.bills = bills;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  async getUsers() {
    this.UserService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  async getCategories() {
    this.CategoriesService.getCategories(CATEGORIES_URL).subscribe({
      next: (categories: any) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  async getProducts() {
    this.ProductsService.getAllProducts(PRODUCTS_URL).subscribe({
      next: (data: Data) => {
        this.products = data['products'];
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    // this.isLoading = true;

    // this.getBills();
    // this.getUsers();
    // // this.getCategories();
    // // this.getProducts();
    // this.isLoading = false;

    this.statistics = [
      {
        icon: 'category.svg',
        title: 'Categories',
        value: 13,
        backgroundColor: '#20E3B2',
        color: 'white',
        redirectTo: '/admin/categories',
      },
      {
        icon: 'product.svg',
        title: 'Products',
        value: 41,
        backgroundColor: '#FF6651',
        color: 'white',
        redirectTo: '/admin/products',
      },
      {
        icon: 'user.svg',
        title: 'Users',
        value: 11,
        backgroundColor: 'rgb(255, 191, 0)',
        color: 'white',
        redirectTo: '/admin/users',
      },
    ];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
