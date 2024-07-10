import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url = 'http://localhost:3000/login';
  // private url = 'https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app';
  private url = environment.apiUrl

  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string|null>;
  token?: string | null

  private authedUserSubject: BehaviorSubject<User | null>
  public authedUser$: Observable<User | null>

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token$ = this.tokenSubject.asObservable();
    this.token$.subscribe(token => this.token = token)

    // const authedUser = localStorage.getItem('authedUser')
    this.authedUserSubject = new BehaviorSubject<User | null>(null);
    this.authedUser$ = this.authedUserSubject.asObservable();
  }

  login(username: string, password: string) {

    const loginData = {
      username: username,
      password: password,
    };

    this.http.post(this.url + '/login', /* loginData */{"username":username,"password":password}).subscribe({
      next: (response: any) => {
        //this.errorMessage = "";
        localStorage.setItem('token', response.token);
        this.tokenSubject.next(response.token);
        // localStorage.setItem('authedUser', response.user);        
        this.authedUserSubject.next(response.user);
      },
      error: (error) => {
        console.error('Login failed:', error);
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
  userInit(): void {
    let token = localStorage.getItem('token')
    if (token) {
      this.http.post(this.url + '/verifyToken', { token }).subscribe({
        next: (response: any) => { this.authedUserSubject.next(response.user);console.log(response.message);
        },
        error: (error: any) => { console.log("nonsi" + JSON.stringify(error));}
      });
    }
    else console.log("token assente");
  }
}