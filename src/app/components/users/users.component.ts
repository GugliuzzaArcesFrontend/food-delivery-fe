import { Component, OnInit } from '@angular/core';
import { NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { FilterUserPipe } from '../../pipes/filter-user-pipe';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    FilterUserPipe,
    TitleCasePipe
  ],
  template: `
    <div class="row container "><!-- py-4  -->
      <div class="col text-center ">
        <label for="user">Mostra utenti:</label>
        <br>
        <select name="" class="my-4" [(ngModel)]="filter">
            <option value="">Tutti gli utenti</option>
            <option value="admin">Amministratori</option>
            <option value="moderator">Moderatori</option>
            <option value="user">Utenti</option>
            <option value="lowrank">Altri utenti</option>
        </select>
        @for (user of users | filterUserPipe: filter; track $index) {
          <p>
            {{user.firstName|titlecase}} {{user.lastName|titlecase}} :
            @if(user.role=='admin'){@if(user.gender=='male'){ Amministratore}@else {Amministratrice}}
            @if(user.role=='moderator'){@if(user.gender=='male'){Moderatore}@else{Moderatrice}}
            @if(user.role=='user'){Utente}
          </p>
        }
      </div>
      <div class="col" ></div>
    </div>
  `,
  styles: ``
})

export class UsersComponent implements OnInit {
  users!: User[]
  filter: string='none'
  constructor(private usersService: UsersService) { }
  ngOnInit(){
    this.usersService.getUsers().subscribe(users => this.users = users)
  }
}
