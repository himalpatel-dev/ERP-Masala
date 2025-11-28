import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addCategory(categoryData: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/admin/categories`, categoryData, { headers });
  }

  getCategories(): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/admin/categories`, { headers });
  }

  getCategoryById(id: string): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/admin/categories/${id}`, { headers });
  }

  updateCategory(id: string, categoryData: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/admin/categories/${id}`, categoryData, { headers });
  }

  deleteCategory(id: string): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/admin/categories/${id}`, { headers });
  }
}
