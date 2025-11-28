import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubCategoryService } from '../../../services/subcategory';
import { CategoryService } from '../../../services/category';

@Component({
    selector: 'app-add-sub-category',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-sub-category.html',
    styleUrl: './add-sub-category.scss'
})
export class AddSubCategoryComponent implements OnInit {
    @Input() subCategoryId: string | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() refresh = new EventEmitter<void>();

    subCategoryForm: FormGroup;
    isLoading = false;
    errorMessage = '';
    categories: any[] = [];

    constructor(
        private fb: FormBuilder,
        private subCategoryService: SubCategoryService,
        private categoryService: CategoryService
    ) {
        this.subCategoryForm = this.fb.group({
            name: ['', [Validators.required]],
            description: [''],
            categoryId: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.loadCategories();
        if (this.subCategoryId) {
            this.loadSubCategory();
        }
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe({
            next: (response: any) => {
                this.categories = Array.isArray(response) ? response : (response.data || []);
            },
            error: (err) => {
                console.error('Error loading categories:', err);
            }
        });
    }

    loadSubCategory() {
        this.isLoading = true;
        this.subCategoryService.getSubCategoryById(this.subCategoryId!).subscribe({
            next: (data) => {
                this.subCategoryForm.patchValue({
                    name: data.name,
                    description: data.description,
                    categoryId: data.categoryId
                });
                this.isLoading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load subcategory details.';
                this.isLoading = false;
                console.error(err);
            }
        });
    }

    onSubmit() {
        if (this.subCategoryForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';

        const subCategoryData = this.subCategoryForm.value;

        const request = this.subCategoryId
            ? this.subCategoryService.updateSubCategory(this.subCategoryId, subCategoryData)
            : this.subCategoryService.addSubCategory(subCategoryData);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                this.refresh.emit();
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = 'Operation failed. Please try again.';
                console.error(err);
            }
        });
    }

    onCancel() {
        this.close.emit();
    }
}
