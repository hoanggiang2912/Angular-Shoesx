import { ProductsService } from './../../../services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BillService } from './../../../services/bill.service';
import { Component } from '@angular/core';
import { Bill } from '../../../../types';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { PRODUCTS_URL } from '../../../../env';
import { CheckoutProductComponent } from '../../../components/checkout-product/checkout-product.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LoaderComponent,
    CheckoutProductComponent,
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  isLoading: boolean = false;

  idOrder!: string;

  bill!: Bill;

  orderFormGroup!: FormGroup;

  constructor(
    private BillService: BillService,
    private route: ActivatedRoute,
    private ProductsService: ProductsService
  ) {
    this.orderFormGroup = new FormGroup({
      deliveryStatus: new FormControl(''),
      paymentStatus: new FormControl(''),
    });
  }

  getBill(id: string) {
    this.isLoading = true;

    this.BillService.getBill(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.bill = data;

        this.orderFormGroup.patchValue({
          deliveryStatus: this.bill.deliveryStatus,
          paymentStatus: this.bill.paymentStatus,
        });

        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  returnQty(id: string, qty: any) {
    this.ProductsService.returnQty(
      `${PRODUCTS_URL}/return-qty/${id}`,
      id,
      qty
    ).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onUpdate() {
    const deliveryStatus = this.orderFormGroup.value.deliveryStatus;
    const paymentStatus = this.orderFormGroup.value.paymentStatus;

    this.BillService.updateBillStatus(
      this.idOrder,
      deliveryStatus,
      paymentStatus
    ).subscribe({
      next: (data: any) => {
        if (data.success) {
          alert('Order updated successfully');
        }
      },
      error: (error) => {
        console.log(error);

        alert('Failed to update order');
      },
    });

    if (deliveryStatus == 'cancel' || paymentStatus == 'cancel') {
      for (let i = 0; i <= this.bill.products.length - 1; i++) {
        const product = this.bill.products[i];

        this.returnQty(product._id, product.qty);
      }
    }
  }

  ngOnInit() {
    this.idOrder = this.route.snapshot.paramMap.get('id')!;

    this.getBill(this.idOrder);
  }
}
