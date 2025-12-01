import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class UomService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    addUom(uomData: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.apiUrl}/admin/uoms`, uomData, { headers });
    }

    getUoms(): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/admin/uoms`, { headers });
    }

    getUomById(id: string): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/admin/uoms/${id}`, { headers });
    }

    updateUom(id: string, uomData: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put(`${this.apiUrl}/admin/uoms/${id}`, uomData, { headers });
    }

    deleteUom(id: string): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.apiUrl}/admin/uoms/${id}`, { headers });
    }
}
