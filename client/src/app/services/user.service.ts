import { Observable } from 'rxjs';
import { AUTH_URL, ROOT_URL } from '../../env';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from '../../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private ApiService: ApiService, private route: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.route.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  signup = (user: User): Observable<any> => {
    return this.ApiService.post(
      `http://127.0.0.1:3000/api/v1/auth/register`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  login = (user: User): Observable<any> => {
    return this.ApiService.post(`${AUTH_URL}/login`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getUsers = (): Observable<User[]> => {
    return this.ApiService.get(`${AUTH_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getUser = (userId: string): Observable<User> => {
    return this.ApiService.get(`${AUTH_URL}/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  createUser = (user: User): Observable<User> => {
    return this.ApiService.post(`${AUTH_URL}/create`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  updateUserInfo = (idUser: string, data: any): Observable<any> => {
    return this.ApiService.patch(`${AUTH_URL}/update-profile/${idUser}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  updateUser = (user: User): Observable<User> => {
    const updatedUser = {
      role: user.role,
      status: user.status,
      note: user.note,
    };

    return this.ApiService.patch(
      `${AUTH_URL}/update-user-admin/${user._id}`,
      updatedUser,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  forgotPassword = (email: string, idUser: string): Observable<any> => {
    return this.ApiService.post(
      `${ROOT_URL}/forgot-password`,
      { email, id: idUser },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  checkEmail = (data: { email: string; id: string }): Observable<any> => {
    return this.ApiService.post(
      `${AUTH_URL}/check-email`,
      { data },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  resetPassword = (
    password: string,
    confirmPassword: string,
    id: string,
    token: string
  ): Observable<any> => {
    return this.ApiService.post(
      `${ROOT_URL}/forgot-password/reset-password/${id}`,
      { password, confirmPassword },
      {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
        },
      }
    );
  };
}
