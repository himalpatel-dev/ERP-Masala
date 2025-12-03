import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private apiUrl = `${environment.apiUrl}/admin/inventory`;

    constructor(private http: HttpClient) { }

    createInventory(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    getAllInventory(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}
