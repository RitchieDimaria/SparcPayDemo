import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/user-form">User Form</a>
      <a routerLink="/list">Person List</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }