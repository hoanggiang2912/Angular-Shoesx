import { UserService } from './../../services/user.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SectionComponent } from '../../components/section/section.component';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    SectionComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isLoading = false;

  signUpForm: FormGroup;
  formMessage!: {
    message: string;
    type: string;
  };

  constructor(private UserService: UserService) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{9}$/),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
    });
  }

  @Input() isOpen!: boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() switch = new EventEmitter<boolean>();

  switchSignupLogin() {
    this.switch.emit(true);
  }

  closeSignup() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeSignup();
  }

  onSubmit(event: Event) {
    this.isLoading = true;

    this.UserService.signup(this.signUpForm.value).subscribe({
      next: (response) => {
        this.formMessage = {
          message:
            'User created successfully! Moving to login after 4 seconds.',
          type: 'success',
        };
        this.signUpForm.reset();
        localStorage.setItem(
          'userSignUp',
          JSON.stringify(this.signUpForm.value)
        );

        setTimeout(() => {
          this.switchSignupLogin();
        }, 4000);
      },
      error: (error) => {
        this.isLoading = false;
        this.formMessage = {
          message: error.error.message,
          type: 'error',
        };
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
