import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean = false;
  constructor(private authService: AuthService, private router: Router) {

   }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(): void {
    this.authService.signIn()
    .then(() => {
     this.router.navigate(['appareils']);
      this.authStatus = this.authService.isAuth;

     })
     .catch(err => console.error('Erreur Async dans le service du fichier auth.service.ts'));
  }

  onSignOut(): void {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}
