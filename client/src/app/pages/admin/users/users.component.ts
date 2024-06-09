import { Component } from '@angular/core';
import { User } from '../../../../types';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users!: User[];
  selectedUser!: User;
  isLoading: boolean = false;
  visible: boolean = false;
  addDialogVisible: boolean = false;
  dialogTitle!: string;
  formMessage!: {
    type: string;
    message: string;
  };
  userForm: FormGroup;

  constructor(private UserService: UserService) {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      phone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [Validators.email, Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$'
        ),
      ]),
      addresses: new FormControl(''),
      note: new FormControl(''),
      status: new FormControl('', [Validators.required]),
    });
  }

  updateUser(user: User) {
    this.isLoading = true;

    const updatedUser = {
      ...this.selectedUser,
      role: this.userForm.value.role,
      note: this.userForm.value.note,
      status: this.userForm.value.status,
    };

    this.UserService.updateUser(updatedUser).subscribe({
      next: (user: User) => {
        // console.log(user);

        this.getUsers();
        this.isLoading = false;

        alert('User updated successfully');
      },
      error: (error: Error) => {
        // console.log(error);
        this.isLoading = false;
        alert('An error occurred. Please try again');
      },
    });
  }

  createUser() {
    this.UserService.createUser(this.userForm.value).subscribe({
      next: (user: User) => {
        console.log(user);

        this.getUsers();
        this.isLoading = false;

        alert('User created successfully');

        this.userForm.reset();
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
        alert('An error occurred. Please try again');

        this.formMessage = {
          message: error.error.message,
          type: 'error',
        };
      },
    });
  }

  showDialog(userId: string) {
    this.visible = true;

    this.UserService.getUser(userId).subscribe((user: User) => {
      this.selectedUser = user;
      // console.log(this.selectedUser);

      this.userForm = new FormGroup({
        name: new FormControl(this.selectedUser.name),
        email: new FormControl(this.selectedUser.email),
        role: new FormControl(this.selectedUser.role),
        password: new FormControl(this.selectedUser.password),
        addresses: new FormControl(this.selectedUser.addresses),
        phone: new FormControl(this.selectedUser.phone),
        note: new FormControl(this.selectedUser.note),
        status: new FormControl(this.selectedUser.status),
      });

      console.log(this.selectedUser);
    });
  }

  showAddDialog() {
    this.addDialogVisible = true;

    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      phone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [Validators.email, Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$'
        ),
      ]),
      addresses: new FormControl(''),
      note: new FormControl(''),
      status: new FormControl('', [Validators.required]),
    });
  }

  getUsers() {
    this.UserService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  ngOnInit() {
    this.getUsers();
  }
}
