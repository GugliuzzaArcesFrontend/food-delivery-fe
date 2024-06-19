import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url = 'http://localhost:3000/login';
  private url = 'https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app';

  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;

  private authedUserSubject: BehaviorSubject<string | null>
  public authedUser$: Observable<string | null>

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token$ = this.tokenSubject.asObservable();

    const authedUser = localStorage.getItem('authedUser')
    this.authedUserSubject = new BehaviorSubject<string | null>(authedUser);
    this.authedUser$ = this.authedUserSubject.asObservable();
  }

  login(username: string, password: string) {

    const loginData = {
      username: username,
      password: password,
    };

    this.http.post(this.url + '/login', loginData).subscribe({
      next: (response: any) => {
        //this.errorMessage = "";
        localStorage.setItem('token', response.token);
        this.tokenSubject.next(response.token);
        console.log("Token: ", response.token);
        localStorage.setItem('authedUser', response.authedUser)
        this.authedUserSubject.next(response.authedUser)
      },
      error: (error) => {
        console.error('Login failed:', error);
        //this.errorMessage = error.error.error;
        //console.log(this.errorMessage);
      },
    });
  }


  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    localStorage.removeItem('authedUser');
    this.authedUserSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

}
