import { Component,Input,OnInit } from '@angular/core';
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
export class UserFormComponent implements OnInit{

  @Input() editMode: Boolean = false;
  @Input() personToEdit:any = "None";
  constructor(private router: Router, private userService:UserService) {}
  
  user = {
    firstName: '' ,
    lastName: '',
    dateOfBirth: '',
    gender: '',
    id:null
  };
  message = ''
  error = false

  bsConfig = {
    adaptivePosition: true,
    dateInputFormat: 'YYYY-MM-DD',
    containerClass: 'theme-default',
    showWeekNumbers: false
  };

  ngOnInit() {
    if(this.editMode){
      this.user.firstName = this.personToEdit.firstName;
      this.user.lastName = this.personToEdit.lastName;
      this.user.dateOfBirth = this.personToEdit.dateOfBirth;
      this.user.gender = this.personToEdit.gender;
    }

  }

  onSubmit() {
    
    if(this.editMode){ // UPDATE PERSON CALL
      this.user.id = this.personToEdit.id
      this.userService.updatePerson(this.user).pipe(
        tap(response => {
          console.log('User Updated successfully', response);
          this.message = 'User successfully Updated!';
          this.error = false;
  
          this.resetForm();
        }),
        catchError(error => {
          console.error('Error Updating user', error);
          this.message = 'An error occurred. Please try again.';
          this.error = true;
          return of(null);
        })
      ).subscribe();

    }
    else { // CREATE PERSON CALL

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

  }

  onCancel() {

    let s = "/"
    if (this.editMode) {
      s = "/list"
    }
    this.router.navigate(["/"]);
    console.log('Form cancelled');
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      id: null
    };
  }
}