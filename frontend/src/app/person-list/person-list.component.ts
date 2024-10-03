import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
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

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.userService.findPersons(this.filterCriteria,this.currentPage,10)
    .subscribe( res => {

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
    this.showEditUserForm = true;
    this.personToEdit = person;
  }

  onDelete(person: any) {
    this.personToDelete = person;
    this.showDeleteConfirmation = true;
  }

  onConfirmDelete() {
    if (this.personToDelete) {
      this.userService.deletePerson(this.personToDelete.id).subscribe();
      this.persons = this.persons.filter(item => item.id !== this.personToDelete.id);
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

  closeUpdateForm() {
    this.showEditUserForm = false;
    this.personToEdit = null;
    this.loadPersons();
  }
  removeUpdateForm = () => {
    this.closeUpdateForm()
  }

}