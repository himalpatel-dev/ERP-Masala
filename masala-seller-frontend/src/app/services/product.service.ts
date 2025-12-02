import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    addProduct(productData: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.apiUrl}/admin/products`, productData, { headers });
    }

    addProductVariant(variantData: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.apiUrl}/admin/product-variants`, variantData, { headers });
    }

    getAllProducts(): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/admin/products`, { headers });
    }

    getAllVariantsProductWise(): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/admin/product-variants/productwise`, { headers });
    }

    updateProductVariant(id: any, variantData: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put(`${this.apiUrl}/admin/product-variants/${id}`, variantData, { headers });
    }

    deleteProductVariant(id: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.apiUrl}/admin/product-variants/${id}`, { headers });
    }

    getProductVariantById(id: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/admin/product-variants/${id}`, { headers });
    }

    getProductById(id: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/admin/products/${id}`, { headers });
    }

    updateProduct(id: any, productData: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put(`${this.apiUrl}/admin/products/${id}`, productData, { headers });
    }

    deleteProduct(id: any): Observable<any> {
        const token = localStorage.getItem('adminToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.apiUrl}/admin/products/${id}`, { headers });
    }
}
