import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { ShopComponent } from './pages/shop/shop.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { CategoryDetailComponent } from './pages/admin/category-detail/category-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminProductDetailComponent } from './pages/admin/admin-product-detail/admin-product-detail.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutCompleteComponent } from './pages/checkout-complete/checkout-complete.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserBillsComponent } from './pages/user-bills/user-bills.component';
import { UserOrderComponent } from './pages/user-order/user-order.component';
import { UserForgotPasswordComponent } from './pages/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordComponent } from './pages/user-reset-password/user-reset-password.component';
import { OrderDetailComponent } from './pages/admin/order-detail/order-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home - Shoesx',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home - Shoesx',
  },
  {
    path: 'shop',
    component: ShopComponent,
    title: 'Shop - Shoesx',
  },
  {
    path: 'shop/product/:idProduct',
    component: ProductDetailComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
    title: 'About - Shoesx',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Create your account - Shoesx',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Shoesx',
  },
  {
    path: 'user/profile/:id',
    component: UserProfileComponent,
    title: 'User Profile - Shoesx',
  },
  {
    path: 'user/orders/:id',
    component: UserOrderComponent,
    title: 'User Orders - Shoesx',
  },
  {
    path: 'user/forgot-password/:id',
    component: UserForgotPasswordComponent,
    title: 'User Forgot Password - Shoesx',
  },
  {
    path: 'user/reset-password/:id',
    component: UserResetPasswordComponent,
    title: 'User Reset Password - Shoesx',
  },
  {
    path: 'cart/checkout',
    component: CheckoutComponent,
    title: 'Checkout - Shoesx',
  },
  {
    path: 'cart/checkout-complete/:billId',
    component: CheckoutCompleteComponent,
    title: 'Checkout Complete - Shoesx',
  },
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    title: 'Shoesx - Dashboard',
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    title: 'Shoesx - Categories',
  },
  {
    path: 'admin/categories/category-detail/:idCategory',
    component: CategoryDetailComponent,
    title: 'Shoesx - Category Detail',
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    title: 'Shoesx Admin - Products',
  },
  {
    path: 'admin/products/add-product',
    component: AddProductComponent,
    title: 'Shoesx Admin - Add Product',
  },
  {
    path: 'admin/products/product-detail/:idProduct',
    component: AdminProductDetailComponent,
    title: 'Shoesx Admin - Products',
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    title: 'Shoesx - Users',
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    title: 'Shoesx - Orders',
  },
  {
    path: 'admin/orders/order-detail/:id',
    component: OrderDetailComponent,
    title: 'Shoesx - Orders',
  },
  {
    path: '**',
    component: Error404Component,
    title: 'Error 404 - Page not found - Shoesx',
  },
];
