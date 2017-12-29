import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';

@Injectable()
export class PreventLoginAccess implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if(!this.authService.isAuthenticated()) return true;

    this.router.navigate(['/selection']);
    return false;
  }
}
