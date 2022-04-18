import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ApiService } from '../services/api.service';
import { Loginuser } from '../loginuser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public oidcSecurityService: OidcSecurityService, private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log("check auth", isAuthenticated);
    });
  }
  
  login() {

    let body = new URLSearchParams();
    body.set('client_id', "m2m.client");
    body.set('grant_type', "client_credentials");
    body.set('password', this.password); //"Pass123$"
    body.set('username', this.username); //"angella"
    body.set('client_secret', "ClientSecret1");

    this.service.login(body).subscribe((response) => {
      this.router.initialNavigation();
      console.log(response);
      console.log(response.access_token);

      localStorage.setItem('token', response.access_token)

      console.log(localStorage.getItem('token'));
      this.router.navigate(([`/pregled`]))
    })
  }

}
