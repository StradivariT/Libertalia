import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth/auth.service';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.css']
})
export class AuthWrapperComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() { this.authService.authenticatedRouting(); }
}
