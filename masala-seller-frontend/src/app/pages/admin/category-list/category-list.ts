import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        CommonModule,
        AddCategoryComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './category-list.html',
    styleUrl: './category-list.scss'
})
export class CategoryListComponent implements OnInit, AfterViewInit {
    private categoryService = inject(CategoryService);

    displayedColumns: string[] = ['name', 'description', 'actions'];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;
    errorMessage = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    // Modal State
    showModal = false;
    selectedCategoryId: string | null = null;

    ngOnInit() {
        this.loadCategories();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadCategories() {
        this.isLoading = true;
        this.categoryService.getCategories().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const data = Array.isArray(response) ? response : (response.data || []);
                this.dataSource.data = data;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load categories.';
                this.isLoading = false;
                console.error('Error loading categories:', err);
            }
        });
    }

    deleteCategory(id: string) {
        if (confirm('Are you sure you want to delete this category?')) {
            this.categoryService.deleteCategory(id).subscribe({
                next: () => {
                    this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
                },
                error: (err) => {
                    alert('Failed to delete category.');
                    console.error('Error deleting category:', err);
                }
            });
        }
    }

    openModal(id: string | null = null) {
        this.selectedCategoryId = id;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.selectedCategoryId = null;
    }

    onModalClose() {
        this.closeModal();
    }

    onModalRefresh() {
        this.closeModal();
        this.loadCategories();
    }
}
