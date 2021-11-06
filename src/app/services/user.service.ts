import { Subject } from 'rxjs/Subject';
import { User } from '../models/User.modul';

export class UserService {
  private users: User[] = [
    {
      firstName: 'James',
      lastName:'Smith',
      email: 'james.smith@gmail.com',
      drinkPreference:'Coca',
      hobbies:['Coder',' Café']
    }
  ];

  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
