import { BILL_URL } from '../../env';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private ApiService: ApiService) {}

  cancel(idBill: string) {
    return this.ApiService.patch(
      `${BILL_URL}/cancel/${idBill}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  createBill(bill: any) {
    return this.ApiService.post(BILL_URL, bill, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getBills = () => {
    return this.ApiService.get(BILL_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getBill = (idBill: string) => {
    return this.ApiService.get(`${BILL_URL}/${idBill}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getUserBills = (idUser: string) => {
    return this.ApiService.get(`${BILL_URL}/user/${idUser}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  updateBillStatus = (
    idBill: string,
    deliveryStatus: string,
    paymentStatus: string
  ) => {
    return this.ApiService.patch(
      `${BILL_URL}/update-status/${idBill}`,
      {
        deliveryStatus,
        paymentStatus,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
}
