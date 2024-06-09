import { ProductsService } from './../../services/products.service';
import { BillService } from './../../services/bill.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Bill, User } from '../../../types';
import { CommonModule } from '@angular/common';
import { PRODUCTS_URL } from '../../../env';

@Component({
  selector: 'app-user-order-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-order-item.component.html',
  styleUrl: './user-order-item.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class UserOrderItemComponent {
  @Input() bill!: Bill;
  @Input() user!: User;
  @Input() isLoading!: boolean;

  constructor(
    private BillService: BillService,
    private ProductsService: ProductsService
  ) {}

  returnQty(id: string, qty: any) {
    return this.ProductsService.returnQty(
      `${PRODUCTS_URL}/return-qty/${id}`,
      id,
      qty
    );
  }

  cancelBill(idBill: string) {
    const confirm = window.confirm(
      'Are you sure you want to cancel this order?'
    );

    if (confirm) {
      this.BillService.cancel(idBill).subscribe({
        next: (res: any) => {
          if (res.success) {
            for (let i = 0; i < this.bill.products.length - 1; i++) {
              const product = this.bill.products[i];

              this.returnQty(product._id, product.qty).subscribe({
                next: (res) => {
                  console.log(res);
                },
                error: (err) => {
                  console.log(err);
                },
              });
            }

            alert('Order has been canceled');
          }

          if (res.errorMessage) {
            alert(res.errorMessage);
          }
        },
        error: (err: any) => {
          console.log(err);
          alert(err.error.errorMessage);
        },
      });
    }
  }

  ngOnInit() {
    console.log(this.bill);
  }
}
