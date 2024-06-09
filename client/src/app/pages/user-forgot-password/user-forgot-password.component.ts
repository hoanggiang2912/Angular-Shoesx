import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionComponent } from '../../components/section/section.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../types';
import { UserService } from '../../services/user.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserSidebarComponent } from '../../components/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    ReactiveFormsModule,
    LoaderComponent,
    UserSidebarComponent,
  ],
  templateUrl: './user-forgot-password.component.html',
  styleUrl: './user-forgot-password.component.scss',
})
export class UserForgotPasswordComponent {
  isLoading: boolean = false;

  idUser!: string;

  user!: User;

  forgotPasswordForm!: FormGroup;

  isSent: boolean = false;

  constructor(private route: ActivatedRoute, private UserService: UserService) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  getUser(id: string) {
    this.UserService.getUser(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  forgot(email: string, idUser: string) {
    this.UserService.forgotPassword(email, idUser).subscribe({
      next: (response) => {
        if (response.sendMail) {
          this.isSent = true;
          alert('Email sent! Please check your inbox!');
        }
      },
      error: (error) => {
        console.error(error);
        alert(error.error.errorMessage);
      },
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      const email = this.forgotPasswordForm.value['email'];

      this.forgot(email, this.idUser);

      this.isLoading = false;
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id')!;

    this.getUser(this.idUser);
  }
}
