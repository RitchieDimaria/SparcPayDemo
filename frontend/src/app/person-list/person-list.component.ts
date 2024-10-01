import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule, FontAwesomeModule]
})
export class PersonListComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  showDeleteConfirmation = false;
  personToDelete: any = null;

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

  onEdit(person: any) {
    // Implement edit logic here
    console.log('Edit clicked for:', person);
  }

  onDelete(person: any) {
    console.log('Delete clicked for:', person);
    this.personToDelete = person;
    this.showDeleteConfirmation = true;
  }

  onConfirmDelete() {
    if (this.personToDelete) {
      this.userService.deletePerson(this.personToDelete.id).subscribe();
      this.closeDeleteConfirmation();
      setInterval(() => {
        this.loadPersons();
        //run code

    },500)
    }
  }
  closeDeleteConfirmation(){
    this.showDeleteConfirmation = false;
    this.personToDelete = null;
  }

}