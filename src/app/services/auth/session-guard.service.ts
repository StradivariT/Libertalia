import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router:      Router
  ) {}
  
  canActivate(): boolean {
    if(!this.authService.isAuthenticated())
      return true;

    this.router.navigate(['/context']);
    return false
  }
}