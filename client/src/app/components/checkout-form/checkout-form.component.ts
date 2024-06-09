import { ProductsService } from './../../services/products.service';
import { BillService } from './../../services/bill.service';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartProduct, ShippingMethod, User } from '../../../types';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { PRODUCTS_URL } from '../../../env';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss',
})
export class CheckoutFormComponent {
  @Output() updateTotal = new EventEmitter<number>();
  @Output() updateShippingFee = new EventEmitter<number>();

  checkoutFormGroup!: FormGroup;
  shippingMethod!: ShippingMethod[];
  cart!: CartProduct[];
  cartTotal!: number;

  total!: number;

  user!: User;

  isLoading: boolean = false;

  constructor(
    private CartService: CartService,
    private route: Router,
    private BillService: BillService,
    private ProductsService: ProductsService
  ) {
    this.checkoutFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      note: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      address: new FormControl('', Validators.required),
      addressDetail: new FormControl(''),
      shippingMethod: new FormControl('', Validators.required),
    });

    this.cart = this.CartService.getCart();

    this.shippingMethod = [
      { name: 'Standard', price: 11000, selected: true },
      { name: 'Express', price: 20000, selected: false },
      { name: 'Next Day', price: 32000, selected: false },
    ];
  }

  selectShippingMethod(index: number) {
    this.shippingMethod.forEach((method, i) => {
      method.selected = i === index;
    });

    this.updateShippingFee.emit(
      this.shippingMethod.find((method) => method.selected)?.price!
    );

    this.updateTotal.emit(
      this.cartTotal +
        this.shippingMethod.find((method) => method.selected)?.price!
    );

    this.total = this.cartTotal + this.shippingMethod[index].price;

    this.checkoutFormGroup.patchValue({
      shippingMethod: this.shippingMethod[index].name,
    });
  }

  clearCart() {
    this.CartService.clearCart();
  }

  updateQty(url: string, id: string, qty: number) {
    return this.ProductsService.updateQty(url, id, qty);
  }

  onSubmit() {
    const bill = {
      ...this.checkoutFormGroup.value,
      idUser: this.user._id,
      shippingMethod: this.shippingMethod.find((method) => method.selected)
        ?.name,
      shippingFee: this.shippingMethod.find((method) => method.selected)?.price,
      subTotal: this.cartTotal,
      total:
        this.cartTotal +
        this.shippingMethod.find((method) => method.selected)?.price!,
      products: this.cart,
    };

    // console.log(this.checkoutFormGroup);
    if (this.checkoutFormGroup.valid) {
      // console.log(bill);
      this.isLoading = true;
      this.BillService.createBill(bill).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.clearCart();

          // update product qty
          this.cart.forEach((product) => {
            this.updateQty(
              `${PRODUCTS_URL}/update-qty/${product._id}`,
              product._id,
              product.qty
            ).subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (err) => {
                alert('Processing error, please try again later.');
              },
            });
          });

          this.route.navigate(['/cart/checkout-complete', res._id]);
        },
        error: (err) => {
          alert('Processing error, please try again later.');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
      this.route.navigate(['/cart/checkout-summary']);
    } else {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.cartTotal = this.CartService.getCartTotal();

    this.user = JSON.parse(localStorage.getItem('user')!);

    this.checkoutFormGroup.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
    });
  }
}
