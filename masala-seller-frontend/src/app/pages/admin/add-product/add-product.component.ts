import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { SubCategoryService } from '../../../services/subcategory.service';
import { UomService } from '../../../services/uom.service';
import { MatTableModule } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatTableModule
    ],
    templateUrl: './add-product.html',
    styleUrls: ['./add-product.scss']
})
export class ProductStepperComponent implements OnInit, OnChanges {
    productForm: FormGroup;
    variantForm: FormGroup;
    variants: any[] = [];
    categories: any[] = [];
    subCategories: any[] = [];
    allSubCategories: any[] = [];
    uoms: any[] = [];
    isSaving = false;
    isEditMode = false;
    editingVariantIndex: number | null = null;
    deletedVariantIds: any[] = [];

    @Input() productId: string | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() refresh = new EventEmitter<void>();

    displayedColumns: string[] = ['variant_code', 'pack_weight', 'net_content', 'actions'];

    constructor(
        private _formBuilder: FormBuilder,
        private productService: ProductService,
        private categoryService: CategoryService,
        private subCategoryService: SubCategoryService,
        private uomService: UomService
    ) {
        this.productForm = this._formBuilder.group({
            name: ['', Validators.required],
            productCode: ['', Validators.required],
            description: [''],
            isActive: [true],
            categoryId: ['', Validators.required],
            subCategoryId: ['', Validators.required]
        });

        this.variantForm = this._formBuilder.group({
            variant_code: ['', Validators.required],
            pack_weight: ['', Validators.required],
            uomId: ['', Validators.required],
            barcode: ['', Validators.required],
            net_content: ['', Validators.required],
            isActive: [true]
        });
    }

    ngOnInit() {
        this.loadCategories();
        this.loadSubCategories();
        this.loadUoms();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['productId']) {
            if (this.productId) {
                this.isEditMode = true;
                this.loadProduct(this.productId);
            } else {
                this.isEditMode = false;
                this.productForm.reset({ isActive: true });
                this.variants = [];
                this.deletedVariantIds = [];
            }
        }
    }

    async loadProduct(id: any) {
        try {
            const product = await lastValueFrom(this.productService.getProductById(id));
            // Adjust based on actual API response structure (e.g. product.data or just product)
            const data = product.data || product;

            this.productForm.patchValue({
                name: data.name,
                productCode: data.productCode,
                description: data.description,
                isActive: data.isActive,
                categoryId: data.categoryId,
                subCategoryId: data.subCategoryId
            });

            // Trigger subcategory load based on category
            this.onCategoryChange(data.categoryId);

            if (data.variants) {
                this.variants = data.variants.map((v: any) => ({
                    ...v,
                    uomId: v.uomId // Ensure uomId is present
                }));
            }
        } catch (error) {
            console.error('Error loading product:', error);
            alert('Failed to load product details.');
        }
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe(res => {
            this.categories = res.data || res;
        });
    }

    loadSubCategories() {
        this.subCategoryService.getSubCategories().subscribe(res => {
            this.allSubCategories = res.data || res;
        });
    }

    loadUoms() {
        this.uomService.getUoms().subscribe(res => {
            this.uoms = res.data || res;
        });
    }

    onCategoryChange(categoryId: any) {
        this.subCategories = this.allSubCategories.filter(sub => sub.categoryId === categoryId);
    }

    getCategoryName(id: string): string {
        return this.categories.find(c => c.id === id)?.name || '';
    }

    getSubCategoryName(id: string): string {
        return this.allSubCategories.find(s => s.id === id)?.name || '';
    }

    addVariant() {
        if (this.variantForm.valid) {
            if (this.editingVariantIndex !== null) {
                const updatedVariants = [...this.variants];
                updatedVariants[this.editingVariantIndex] = this.variantForm.value;
                this.variants = updatedVariants;
                this.editingVariantIndex = null;
            } else {
                this.variants = [...this.variants, this.variantForm.value];
            }
            this.variantForm.reset({ isActive: true });
        }
    }

    editVariant(index: number) {
        this.editingVariantIndex = index;
        this.variantForm.patchValue(this.variants[index]);
    }

    cancelEdit() {
        this.editingVariantIndex = null;
        this.variantForm.reset({ isActive: true });
    }

    removeVariant(index: number) {
        const variant = this.variants[index];
        if (variant.variant_id) {
            this.deletedVariantIds.push(variant.variant_id);
        }
        this.variants = this.variants.filter((_, i) => i !== index);
        if (this.editingVariantIndex === index) {
            this.cancelEdit();
        }
    }

    async saveAll() {
        if (this.productForm.invalid) return;

        this.isSaving = true;
        try {
            const productData = this.productForm.value;
            let productId = this.productId;

            if (this.isEditMode) {
                await lastValueFrom(this.productService.updateProduct(this.productId, productData));
            } else {
                const productRes = await lastValueFrom(this.productService.addProduct(productData));
                productId = productRes.product.id

            }

            for (const variant of this.variants) {
                const variantData = { ...variant, productId };
                if (variant.variant_id) {
                    await lastValueFrom(this.productService.updateProductVariant(variant.variant_id, variantData));
                } else {
                    await lastValueFrom(this.productService.addProductVariant(variantData));
                }
            }

            // Process deleted variants
            for (const id of this.deletedVariantIds) {
                await lastValueFrom(this.productService.deleteProductVariant(id));
            }
            this.deletedVariantIds = [];

            alert(this.isEditMode ? 'Product updated successfully!' : 'Product and variants saved successfully!');
            this.refresh.emit();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product.');
        } finally {
            this.isSaving = false;
        }
    }

    onClose() {
        this.close.emit();
    }
}
