import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule]
})
export class PersonListComponent implements OnInit {
  persons$: Observable<any[]> = of([]);
  filterCriteria = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.persons$ = this.userService.findPersons(this.filterCriteria);
  }

  onFilterChange() {
    this.loadPersons();
  }
}