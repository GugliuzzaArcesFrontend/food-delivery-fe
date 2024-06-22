import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService{
  private url='https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app';
  constructor(private http:HttpClient){}
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url+'/users')
  }
}