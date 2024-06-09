import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading = false;
  hasUser = false;
  formMessage!: {
    message: string;
    type: string;
  };

  logInForm: FormGroup;

  constructor(private UserService: UserService) {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ]),
    });
  }

  @Input() isOpen!: boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() switch = new EventEmitter<boolean>();
  @Output() emitHasUser = new EventEmitter<boolean>();

  closeLogin() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }

  switchSignupLogin() {
    this.switch.emit(true);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeLogin();
  }

  onLogin() {
    this.isLoading = true;

    this.UserService.login(this.logInForm.value).subscribe({
      next: (res) => {
        this.formMessage = {
          message: res.message,
          type: 'success',
        };
        this.logInForm.reset();
        localStorage.setItem('user', JSON.stringify(res.user));

        setTimeout(() => {
          this.closeLogin();
        }, 1000);

        alert('Logged in successfully!');

        this.emitHasUser.emit(true);
      },
      error: (err) => {
        this.isLoading = false;

        this.formMessage = {
          message: err.error.message,
          type: 'error',
        };

        setTimeout(() => {
          this.formMessage = {
            message: '',
            type: '',
          };
        }, 3000);

        this.emitHasUser.emit(false);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
