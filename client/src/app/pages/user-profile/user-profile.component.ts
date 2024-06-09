import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionComponent } from '../../components/section/section.component';
import { UserSidebarComponent } from '../../components/user-sidebar/user-sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    UserSidebarComponent,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  isLoading: boolean = false;

  idUser!: string;

  user!: User;

  userFormGroup!: FormGroup;

  constructor(private UserService: UserService, private route: ActivatedRoute) {
    this.userFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10,11}$/),
      ]),
    });
  }

  getUser(id: string) {
    this.UserService.getUser(id).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log(res);

        this.userFormGroup.patchValue({
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSave() {
    const data = {
      name: this.userFormGroup.get('name')!.value,
      email: this.userFormGroup.get('email')!.value,
      phone: this.userFormGroup.get('phone')!.value,
    };

    this.isLoading = true;

    this.UserService.updateUserInfo(this.idUser, data).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Updated successfully!');
        this.isLoading = false;
        this.userFormGroup.patchValue({
          email: this.user.email,
        });
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || 'Updating falied! Please try again later.');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDiscard() {
    this.userFormGroup.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
    });
  }

  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id')!;

    this.getUser(this.idUser);
  }
}
