import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubCategoryService } from '../../../services/subcategory';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category';

@Component({
    selector: 'app-sub-category-list',
    standalone: true,
    imports: [
        CommonModule,
        AddSubCategoryComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './sub-category-list.html',
    styleUrl: './sub-category-list.scss'
})
export class SubCategoryListComponent implements OnInit, AfterViewInit {
    private subCategoryService = inject(SubCategoryService);

    displayedColumns: string[] = ['name', 'categoryName', 'description', 'actions'];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;
    errorMessage = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    // Modal State
    showModal = false;
    selectedSubCategoryId: string | null = null;

    ngOnInit() {
        this.loadSubCategories();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadSubCategories() {
        this.isLoading = true;
        this.subCategoryService.getSubCategories().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const data = Array.isArray(response) ? response : (response.data || []);
                // Ensure we handle the nested category object if present to display category name
                // The API might return 'Category' object inside each subcategory
                data.forEach((item: any) => {
                    item.categoryName = item.category?.name || '';
                });
                this.dataSource.data = data;
                console.log(data);

            },
            error: (err) => {
                this.errorMessage = 'Failed to load subcategories.';
                this.isLoading = false;
                console.error('Error loading subcategories:', err);
            }
        });
    }

    deleteSubCategory(id: string) {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            this.subCategoryService.deleteSubCategory(id).subscribe({
                next: () => {
                    this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
                },
                error: (err) => {
                    alert('Failed to delete subcategory.');
                    console.error('Error deleting subcategory:', err);
                }
            });
        }
    }

    openModal(id: string | null = null) {
        this.selectedSubCategoryId = id;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.selectedSubCategoryId = null;
    }

    onModalClose() {
        this.closeModal();
    }

    onModalRefresh() {
        this.closeModal();
        this.loadSubCategories();
    }
}
