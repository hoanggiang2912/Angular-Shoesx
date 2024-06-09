import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct, Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartProduct[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart.next(savedCart);
  }

  getCart() {
    return this.cart.getValue();
  }

  getCartTotal() {
    return this.cart.getValue().reduce((acc, cur) => {
      if (cur.salePrice) {
        return (acc += ((cur.price * cur.salePrice) / 100) * cur.qty);
      } else {
        return (acc += cur.price * cur.qty);
      }
    }, 0);
  }

  addToCart(product: CartProduct, qty: number) {
    const currentCart = this.cart.getValue();
    if (currentCart.find((p) => p._id === product._id)) {
      currentCart.forEach((p) => {
        if (p._id === product._id) {
          if (qty) {
            p.qty = qty;
          }
          p.qty++;
        }
      });
      this.cart.next(currentCart);
      localStorage.setItem('cart', JSON.stringify(currentCart));
    } else {
      const newCart = [...currentCart, { ...product, qty: 1 }];
      this.cart.next(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  removeFromCart(product: CartProduct) {
    let currentCart = this.cart.getValue();
    currentCart = currentCart.filter((p) => p._id !== product._id);
    this.cart.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  clearCart() {
    this.cart.next([]);
    localStorage.setItem('cart', '[]');
  }

  increaseQty(product: CartProduct) {
    let currentCart = this.cart.getValue();
    const index = currentCart.findIndex((p) => p._id === product._id);
    currentCart[index].qty++;
    this.cart.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  decreaseQty(product: CartProduct) {
    let currentCart = this.cart.getValue();
    const index = currentCart.findIndex((p) => p._id === product._id);
    if (currentCart[index].qty > 1) {
      currentCart[index].qty--;
    }
    this.cart.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  calculateTotal() {
    const currentCart = this.cart.getValue();
    return currentCart.reduce(
      (acc, cur) =>
        cur.salePrice
          ? (acc += ((cur.price * cur.salePrice) / 100) * cur.qty)
          : (acc += cur.price * cur.qty),
      0
    );
  }
}
