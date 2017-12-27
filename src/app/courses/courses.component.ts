import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from './../services/auth.service';

import { toastDuration } from './../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authenticatedRouting();
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
