import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      user-page works! {{user.id+' '+user.firstName+' '+user.lastName}}
    </p>
  `,
  styles: ``
})
export class UserPageComponent implements OnInit{
  user!:User
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.authedUser$.subscribe(user=>this.user=user!=null?JSON.parse(user):undefined)
  }
}
