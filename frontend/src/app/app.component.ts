import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  styleUrls:["./app.component.css"],
  template: `
      <div class="container">
      <nav>
        <ul>
          <li><a routerLink="/user-form">User Form</a></li>
          <li><a routerLink="/list">Person List</a></li>
        </ul>
      </nav>
        <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent { }