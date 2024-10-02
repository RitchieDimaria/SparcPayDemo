import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertPerson`, userData);
  }

  findPersons(filterCriteria: any): Observable<any[]> {
    let params = new HttpParams();
    Object.keys(filterCriteria).forEach(key => {
      if (filterCriteria[key]) {
        params = params.append(key, filterCriteria[key]);
      }
    });

    return this.http.get<any[]>(`${this.apiUrl}/findPerson`, { params });
  }

  updatePerson(personData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatePerson`, personData);
  }

  deletePerson(id:string):Observable<any> {
    console.log(id)
    return this.http.delete(`${this.apiUrl}/deletePerson/${id}`); 
  }

}