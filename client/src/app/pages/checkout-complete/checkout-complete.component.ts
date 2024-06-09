import { BillService } from './../../services/bill.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionComponent } from '../../components/section/section.component';
import { Bill } from '../../../types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-complete',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './checkout-complete.component.html',
  styleUrl: './checkout-complete.component.scss',
})
export class CheckoutCompleteComponent {
  bill!: Bill;
  idBill!: string;

  constructor(
    private BillService: BillService,
    private route: ActivatedRoute
  ) {}

  getBill(id: string) {
    this.BillService.getBill(this.idBill).subscribe({
      next: (res: any) => {
        console.log(res);

        this.bill = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.idBill = this.route.snapshot.paramMap.get('billId')!;

    this.getBill(this.idBill);
  }
}
