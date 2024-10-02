import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule, FontAwesomeModule,UserFormComponent]
})
export class PersonListComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  showDeleteConfirmation = false; // Variables for deleting a user
  personToDelete: any = null;

  showEditUserForm = false; // Variables for user edit form
  personToEdit: any = null;

  page: any;
  persons: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
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
    console.log(this.currentPage)
    this.userService.findPersons(this.filterCriteria,this.currentPage,10)
    .subscribe( res => {
    console.log(res)

    this.page = res
    this.persons = this.page.persons;
    this.totalElements = this.page.totalEntries;
    this.totalPages = this.page.totalPages; }
    );
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadPersons();
  }

  onEdit(person: any) {
    console.log('Edit clicked for:', person);
    this.showEditUserForm = true;
    this.personToEdit = person;
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
    }
  }
  closeDeleteConfirmation(){
    this.showDeleteConfirmation = false;
    this.personToDelete = null;
  }


  nextPage() {
    if (this.currentPage <= this.totalPages - 1) {
      this.currentPage++;
      this.loadPersons();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPersons();
    }
  }

}