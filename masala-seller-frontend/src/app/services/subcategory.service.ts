import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService {
    private apiUrl = `${environment.apiUrl}/admin/subcategories`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('adminToken');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getSubCategories(): Observable<any> {
        return this.http.get(this.apiUrl, { headers: this.getHeaders() });
    }

    getSubCategoryById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    addSubCategory(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
    }

    updateSubCategory(id: string, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
    }

    deleteSubCategory(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}
