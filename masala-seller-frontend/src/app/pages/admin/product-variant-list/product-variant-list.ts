import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { ProductStepperComponent } from '../add-product/add-product.component';

@Component({
    selector: 'app-product-variant-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        ProductStepperComponent
    ],
    templateUrl: './product-variant-list.html',
    styleUrl: './product-variant-list.scss',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ProductVariantListComponent implements OnInit, AfterViewInit {
    private productService = inject(ProductService);
    private router = inject(Router);

    displayedColumns: string[] = [
        'expand',
        'productCode',
        'name',
        'category',
        'subcategory',
        'actions'
    ];
    dataSource = new MatTableDataSource<any>([]);
    expandedElement: any | null;
    isLoading = false;
    errorMessage = '';

    showModal = false;
    selectedProductId: string | null = null;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.loadProducts();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadProducts() {
        this.isLoading = true;
        this.productService.getAllProducts().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const data = Array.isArray(response) ? response : (response.data || []);
                this.dataSource.data = data;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load products.';
                this.isLoading = false;
                console.error('Error loading products:', err);
            }
        });
    }

    navigateToAddProduct() {
        this.openModal(null);
    }

    editVariant(variant: any) {
        if (variant.productId) {
            this.openModal(variant.productId);
        } else {
            console.error('Product ID missing for variant:', variant);
            alert('Cannot edit: Product ID missing.');
        }
    }

    openModal(productId: string | null) {
        this.selectedProductId = productId;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.selectedProductId = null;
    }

    onModalRefresh() {
        this.closeModal();
        this.loadProducts();
    }

    deleteProduct(id: string) {
        if (confirm('Are you sure you want to delete this product? This will also delete all its variants.')) {
            this.productService.deleteProduct(id).subscribe({
                next: () => {
                    this.loadProducts(); // Reload list
                },
                error: (err: any) => {
                    alert('Failed to delete product.');
                    console.error('Error deleting product:', err);
                }
            });
        }
    }
}
