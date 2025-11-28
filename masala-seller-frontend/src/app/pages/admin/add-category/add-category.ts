import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss'
})
export class AddCategoryComponent implements OnInit {
  @Input() categoryId: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  categoryData = {
    name: '',
    description: ''
  };
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  isEditMode = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: string) {
    this.isLoading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.categoryData = { name: data.name, description: data.description };
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load category details.';
        this.isLoading = false;
        console.error('Error loading category:', err);
      }
    });
  }

  onSubmit() {
    if (!this.categoryData.name || !this.categoryData.description) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditMode && this.categoryId) {
      this.categoryService.updateCategory(this.categoryId, this.categoryData).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Category updated successfully!';
          setTimeout(() => this.refresh.emit(), 1000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to update category. Please try again.';
          console.error('Update Category Error:', err);
        }
      });
    } else {
      this.categoryService.addCategory(this.categoryData).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Category added successfully!';
          this.categoryData = { name: '', description: '' };
          setTimeout(() => this.refresh.emit(), 1000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to add category. Please try again.';
          console.error('Add Category Error:', err);
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
