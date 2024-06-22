import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'filterUserPipe',
  standalone: true
})

export class FilterUserPipe implements PipeTransform {
  transform(users: User[], filter: string): User[] {
    if (!filter) return users;
    if (filter == 'lowrank') return users.filter(item => !item.role.includes('admin') && !item.role.includes('moderator'))
    return users?.filter(item => item.role.includes(filter));
  }
}