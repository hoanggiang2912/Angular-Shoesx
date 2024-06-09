import { BillService } from './../../services/bill.service';
import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { SectionComponent } from '../../components/section/section.component';
import { UserSidebarComponent } from '../../components/user-sidebar/user-sidebar.component';
import { Bill, User } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { UserOrderItemComponent } from '../../components/user-order-item/user-order-item.component';

@Component({
  selector: 'app-user-order',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    SectionComponent,
    UserSidebarComponent,
    UserOrderItemComponent,
  ],
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.scss',
})
export class UserOrderComponent {
  isLoading: boolean = false;

  user!: User;

  idUser!: string;

  bills!: Bill[];

  constructor(
    private UserService: UserService,
    private BillService: BillService,
    private route: ActivatedRoute
  ) {}

  getUserBills(idUser: string) {
    this.BillService.getUserBills(idUser).subscribe({
      next: (res: any) => {
        console.log(res);
        this.bills = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getUser(id: string) {
    this.UserService.getUser(id).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.idUser = this.route.snapshot.paramMap.get('id')!;
    this.getUser(this.idUser);
    this.getUserBills(this.idUser);
    this.isLoading = false;
  }
}
