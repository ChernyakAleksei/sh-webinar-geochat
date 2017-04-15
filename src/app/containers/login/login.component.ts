import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public nickname: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  
  }

  login(loginForm: NgForm) {
    console.log(loginForm);
    if (loginForm.invalid) {
      return;
    }
    this.authService.loginAsUser({email: this.email, nickname: this.nickname})
    .then(() => {
      this.router.navigate(['chat']);
    })
  }

}
