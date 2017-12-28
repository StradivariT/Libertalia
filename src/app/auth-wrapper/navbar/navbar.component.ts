import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth/auth.service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router, private loadingSpinner: Ng4LoadingSpinnerService) { }

  logout() {
    this.loadingSpinner.show();
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .then(() => this.loadingSpinner.hide());
  }
}
