import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
    styleUrl: './product-variant-list.scss'
})
export class ProductVariantListComponent implements OnInit, AfterViewInit {
    private productService = inject(ProductService);
    private router = inject(Router);

    displayedColumns: string[] = [
        'variant_code',
        'productname',
        'category',
        'subcategory',
        'pack_with_unit',
        'net_content',
        'barcode',
        'actions'
    ];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;
    errorMessage = '';

    showModal = false;
    selectedProductId: string | null = null;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.loadVariants();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadVariants() {
        this.isLoading = true;
        this.productService.getAllVariantsProductWise().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                // The API returns a flat array directly
                const data = Array.isArray(response) ? response : (response.data || []);
                this.dataSource.data = data;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load product variants.';
                this.isLoading = false;
                console.error('Error loading variants:', err);
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
        this.loadVariants();
    }

    deleteVariant(id: string) {
        if (confirm('Are you sure you want to delete this variant?')) {
            this.productService.deleteProductVariant(id).subscribe({
                next: () => {
                    this.loadVariants(); // Reload list
                },
                error: (err) => {
                    alert('Failed to delete variant.');
                    console.error('Error deleting variant:', err);
                }
            });
        }
    }
}
