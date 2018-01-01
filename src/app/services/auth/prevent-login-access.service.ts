import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class PreventLoginAccess implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router) {}

  canActivate() {
    if(!this.authService.isAuthenticated()) return true;

    this.router.navigate(['/context']);
    return false;
  }
}