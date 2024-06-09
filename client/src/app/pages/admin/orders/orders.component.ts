import { BillService } from './../../../services/bill.service';
import { Component } from '@angular/core';
import { Bill } from '../../../../types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterModule,
    LoaderComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  isLoading: boolean = false;

  bills!: Bill[];

  constructor(private BillService: BillService) {}

  getBills() {
    this.isLoading = true;

    this.BillService.getBills().subscribe({
      next: (bills: any) => {
        this.bills = bills;
        this.isLoading = false;
        // console.log(this.bills);
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  ngOnInit() {
    this.getBills();
  }
}
