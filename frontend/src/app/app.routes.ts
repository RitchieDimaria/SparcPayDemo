import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { PersonListComponent } from './person-list/person-list.component';

export const routes: Routes = [
  { path: 'user-form', component: UserFormComponent },
  { path: 'list', component: PersonListComponent },
];