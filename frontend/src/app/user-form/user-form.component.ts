import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDatepickerModule],
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  constructor(private router: Router, private userService:UserService) {}
  

  user = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: ''
  };
  message = ''
  error = false

  bsConfig = {
    adaptivePosition: true,
    dateInputFormat: 'YYYY-MM-DD',
    containerClass: 'theme-default',
    showWeekNumbers: false
  };

  onSubmit() {
    console.log('Form submitted', this.user); // From Submission

    this.userService.createUser(this.user).pipe(
      tap(response => {
        console.log('User created successfully', response);
        this.message = 'User successfully added!';
        this.error = false;

        this.resetForm();
      }),
      catchError(error => {
        console.error('Error creating user', error);
        this.message = 'An error occurred. Please try again.';
        this.error = true;
        return of(null);
      })
    ).subscribe();
  }

  onCancel() {
    
    this.router.navigate(['/']); //Need to adjust later so it goes to appropriate route
    console.log('Form cancelled');
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: ''
    };
  }
}