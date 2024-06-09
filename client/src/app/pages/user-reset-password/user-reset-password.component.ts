import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BillService } from './../../services/bill.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../components/section/section.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-reset-password',
  standalone: true,
  imports: [CommonModule, SectionComponent, ReactiveFormsModule],
  templateUrl: './user-reset-password.component.html',
  styleUrl: './user-reset-password.component.scss',
})
export class UserResetPasswordComponent {
  isLoading: boolean = false;

  idUser!: string;

  token!: string;

  resetPasswordForm!: FormGroup;

  constructor(private UserService: UserService, private route: ActivatedRoute) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  resetPassword(
    password: string,
    confirmPassword: string,
    id: string,
    token: string
  ) {
    this.isLoading = true;
    this.UserService.resetPassword(
      password,
      confirmPassword,
      id,
      token
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        // console.log(response);
        if (response.success === true) {
          alert('Password reset successfully');
        }
      },
      error: (error) => {
        this.isLoading = false;
        alert(error.error.errorMessage);
        // console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
    } else {
      const password = this.resetPasswordForm.value.password;
      const confirmPassword = this.resetPasswordForm.value.confirmPassword;
      const id = this.idUser;

      this.resetPassword(password, confirmPassword, id, this.token);
    }
  }

  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id')!;

    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });

    // console.log(this.token);
  }
}
