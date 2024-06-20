import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterUserPipe } from '../../pipes/filter-user-pipe';

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
    <div class="row py-4 container text-center">
      <div class="col">
        <label for="user">Choose a User:</label>
        <br>
        <select name="" class="my-4" [(ngModel)]="filter">
            <option value=""selected>Tutti gli utenti</option>
            <option value="admin">Amministratori</option>
            <option value="moderator">Moderatori</option>
            <option value="user">Utenti</option>
            <option value="!admin">Altri utenti</option>
        </select>
        @for (user of users | filterUserPipe: filter; track $index) {
          <p>
            {{user.firstName|titlecase}} {{user.lastName|titlecase}} 
            @if(user.role=='admin'){: @if(user.gender=='male'){ Amministratore}@else {Amministratrice}}
            @if(user.role=='moderator'){: @if(user.gender=='male'){Moderatore}@else{Moderatrice}}
          </p>
        }
      </div>
    </div>
  `,
  styles: ``
})

export class UsersComponent implements OnInit {
  users!: User[]
  filter: string = ''
  constructor(private usersService: UsersService) { }
  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users = users)
  }
}
