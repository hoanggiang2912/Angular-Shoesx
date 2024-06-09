import { UserService } from './../../services/user.service';
import { CartService } from './../../services/cart.service';
import { CartComponent } from './../../components/cart/cart.component';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CartProduct, User } from '../../../types';
import { SignupComponent } from '../../pages/signup/signup.component';
import { LoginComponent } from '../../pages/login/login.component';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    CartComponent,
    SearchBoxComponent,
    PanelMenuModule,
    SignupComponent,
    LoginComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private cd: ChangeDetectorRef,
    private cartService: CartService,
    private UserService: UserService
  ) {}

  isOpenUserWidget: boolean = false;
  isOpenSignUp!: boolean;
  isOpenLogin!: boolean;
  isOpenSidebar!: boolean;
  isOpenCart!: boolean;
  isOpenSearchBox!: boolean;
  cartProducts: CartProduct[] = [];
  user!: User;
  hasUser = false;

  logout() {
    this.hasUser = false;
    this.UserService.logout();
  }

  openSidebar() {
    this.isOpenSidebar = true;
  }

  closeSidebar() {
    this.isOpenSidebar = false;
  }

  openCart() {
    this.isOpenCart = true;
  }

  closeCart() {
    this.isOpenCart = false;
  }

  openSearchBox() {
    this.isOpenSearchBox = true;
  }

  closeSearchBox() {
    this.isOpenSearchBox = false;
  }

  openSignUp() {
    this.isOpenSignUp = true;
  }

  closeSignUp() {
    this.isOpenSignUp = false;
  }

  openLogin() {
    this.isOpenLogin = true;
  }

  closeLogin() {
    this.isOpenLogin = false;
  }

  toggleUserWidget() {
    this.isOpenUserWidget = !this.isOpenUserWidget;
  }

  switchSignUpLogin() {
    this.isOpenSignUp = !this.isOpenSignUp;
    this.isOpenLogin = !this.isOpenLogin;
  }

  emitHasUser(event: any) {
    this.hasUser = event;
  }

  @HostListener('document:scroll', ['$event'])
  onScrollEvent($event: any) {
    if (window.scrollY > 0) {
      document.querySelector('.header')?.classList.add('sticky');
    } else {
      document.querySelector('.header')?.classList.remove('sticky');
    }
  }

  ngOnInit() {
    this.cartService.cart$.subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.cd.detectChanges();
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (Object.keys(this.user).length > 0) {
      this.hasUser = true;
    }
  }
}
