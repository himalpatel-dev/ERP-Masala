import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private apiUrl = `${environment.apiUrl}/admin/inventory`;

    constructor(private http: HttpClient) { }

    createInventory(data: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl, data, { headers });
    }

    getAllInventory(): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.apiUrl, { headers });
    }

    getInventoryById(id: string): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/${id}`, { headers });
    }

    updateInventory(id: string, data: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
    }

    deleteInventory(id: string): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }
}
