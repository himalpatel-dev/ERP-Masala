import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InventoryService } from '../../../services/inventory.service';
import { ProductService } from '../../../services/product.service';
import { WarehouseService } from '../../../services/warehouse.service';

@Component({
    selector: 'app-add-inventory-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule
    ],
    templateUrl: './add-inventory.component.html',
    styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryModalComponent implements OnInit {
    @Input() inventoryId: string | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() refresh = new EventEmitter<void>();

    inventoryForm: FormGroup;
    products: any[] = [];
    allVariants: any[] = [];
    filteredVariants: any[] = [];
    warehouses: any[] = [];
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private inventoryService: InventoryService,
        private productService: ProductService,
        private warehouseService: WarehouseService,
        private snackBar: MatSnackBar
    ) {
        this.inventoryForm = this.fb.group({
            product_id: [''], // Optional, for UI filtering only
            variant_id: ['', Validators.required],
            warehouse_id: ['', Validators.required],
            mfg_date: ['', Validators.required],
            expiry_date: ['', Validators.required],
            qty_on_hand: [0, [Validators.required, Validators.min(0)]],
            qty_reserved: [0, [Validators.required, Validators.min(0)]],
            cost_per_unit: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.loadProducts();
        this.loadWarehouses();
        if (this.inventoryId) {
            this.loadInventoryForEdit(this.inventoryId);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['inventoryId'] && !changes['inventoryId'].firstChange) {
            const id = changes['inventoryId'].currentValue;
            if (id) {
                this.loadInventoryForEdit(id);
            } else {
                // reset form when inventoryId is cleared
                this.inventoryForm.reset();
                this.filteredVariants = this.allVariants;
            }
        }
    }

    loadInventoryForEdit(id: string) {
        this.isLoading = true;
        this.inventoryService.getInventoryById(id).subscribe({
            next: (data) => {
                this.isLoading = false;
                // backend shape may vary; try common fields
                const inv = data?.data || data;
                if (inv) {
                    // patch form fields that are independent
                    const existingVariantId = inv.variant_id || inv.variant?.variant_id || inv.variant?.id || '';
                    this.inventoryForm.patchValue({
                        warehouse_id: inv.warehouse_id || inv.warehouse?.warehouse_id || '',
                        mfg_date: inv.mfg_date ? new Date(inv.mfg_date) : '',
                        expiry_date: inv.expiry_date ? new Date(inv.expiry_date) : '',
                        qty_on_hand: inv.qty_on_hand ?? 0,
                        qty_reserved: inv.qty_reserved ?? 0,
                        cost_per_unit: inv.cost_per_unit ?? 0
                    });

                    if (existingVariantId) {
                        // If inventory only stores variant_id, fetch variant to derive product id and variants list
                        console.log('loadInventoryForEdit -> existingVariantId', existingVariantId);
                        this.productService.getProductVariantById(existingVariantId).subscribe({
                            next: (variantResp) => {
                                const variant = variantResp?.data || variantResp;
                                console.log('getProductVariantById response', variant);
                                const productId = variant?.product_id || variant?.product?.id || variant?.product?.product_id || variant?.product?.productId;
                                if (productId) {
                                    // Load product to get its variants and set filteredVariants
                                    this.productService.getProductById(productId).subscribe({
                                        next: (product) => {
                                            const prod = product?.data || product;
                                            console.log('getProductById response productId=', productId, 'variants=', (prod.variants || []).length);
                                            this.filteredVariants = (prod.variants || []).map((v: any) => ({ ...v, product_name: prod.name }));
                                            // set product_id and variant_id in the form
                                            this.inventoryForm.patchValue({ product_id: productId, variant_id: existingVariantId });
                                        },
                                        error: (err) => {
                                            console.error('Error loading product when preparing edit form', err);
                                            // fallback: still set variant id
                                            this.inventoryForm.patchValue({ variant_id: existingVariantId });
                                        }
                                    });
                                } else {
                                    // If variant response doesn't include product info, try fallback: fetch product-wise variants and search
                                    console.warn('Variant response missing productId, trying fallback product-variant list');
                                    this.productService.getAllVariantsProductWise().subscribe({
                                        next: (vw) => {
                                            const list = vw?.data || vw || [];
                                            console.log('getAllVariantsProductWise -> rows count', list.length);
                                            // The backend may return either grouped entries or flat variant rows.
                                            // First try flat rows: each row contains variant_id and productId/productname
                                            const flatMatch = list.find((r: any) => String(r.variant_id || r.id || r.variantId) === String(existingVariantId));
                                            if (flatMatch) {
                                                const productId = flatMatch.productId || flatMatch.product_id || flatMatch.productid || flatMatch.productId;
                                                console.log('Fallback flat match found, productId=', productId, 'row=', flatMatch);
                                                if (productId) {
                                                    // load full product to get variants
                                                    this.productService.getProductById(productId).subscribe({
                                                        next: (product) => {
                                                            const prod = product?.data || product;
                                                            this.filteredVariants = (prod.variants || []).map((v: any) => ({ ...v, product_name: prod.name }));
                                                            this.inventoryForm.patchValue({ product_id: productId, variant_id: existingVariantId });
                                                        },
                                                        error: (err) => {
                                                            console.error('Error loading product in fallback', err);
                                                            this.inventoryForm.patchValue({ variant_id: existingVariantId });
                                                        }
                                                    });
                                                    return;
                                                }
                                            }

                                            // If not flat, handle grouped shape
                                            let found = false;
                                            for (const entry of list) {
                                                const variants = entry?.variants || entry?.product_variants || [];
                                                const prod = entry?.product || entry;
                                                for (const v of variants) {
                                                    const vid = v.variant_id || v.id || v.variantId;
                                                    if (String(vid) === String(existingVariantId)) {
                                                        // found matching product
                                                        this.filteredVariants = (variants || []).map((x: any) => ({ ...x, product_name: prod?.name || prod?.product_name }));
                                                        this.inventoryForm.patchValue({ product_id: prod?.id || prod?.product_id || prod?.productId, variant_id: existingVariantId });
                                                        found = true;
                                                        break;
                                                    }
                                                }
                                                if (found) break;
                                            }
                                            if (!found) {
                                                console.warn('Fallback search did not find variant in product-wise list');
                                                this.inventoryForm.patchValue({ variant_id: existingVariantId });
                                            }
                                        },
                                        error: (err) => {
                                            console.error('Error fetching product-wise variants fallback', err);
                                            this.inventoryForm.patchValue({ variant_id: existingVariantId });
                                        }
                                    });
                                }
                            },
                            error: (err) => {
                                console.error('Error loading variant details', err);
                                // fallback: still set variant id
                                this.inventoryForm.patchValue({ variant_id: existingVariantId });
                            }
                        });
                    }
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Error loading inventory for edit', err);
                this.snackBar.open('Error loading inventory details', 'Close', { duration: 3000 });
            }
        });
    }

    loadProducts() {
        this.productService.getAllProducts().subscribe({
            next: (data) => {
                // normalize response shape
                this.products = data?.data || data || [];
                console.log('loadProducts -> products count', this.products.length);
            },
            error: (err) => console.error('Error loading products', err)
        });
    }

    onProductChange(productId: string) {
        if (!productId) {
            this.filteredVariants = [];
            this.inventoryForm.patchValue({ variant_id: '' });
            return;
        }

        this.isLoading = true;
        this.productService.getProductById(productId).subscribe({
            next: (product) => {
                this.isLoading = false;
                // Map variants to include product name for display consistency
                this.filteredVariants = (product.variants || []).map((v: any) => ({
                    ...v,
                    product_name: product.name
                }));
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Error loading product variants', err);
                this.snackBar.open('Error loading variants', 'Close', { duration: 3000 });
            }
        });

        // Reset variant selection
        this.inventoryForm.patchValue({ variant_id: '' });
    }

    loadWarehouses() {
        this.warehouseService.getWarehouses().subscribe({
            next: (data) => {
                this.warehouses = data;
            },
            error: (err) => console.error('Error loading warehouses', err)
        });
    }

    onSubmit() {
        if (this.inventoryForm.valid) {
            this.isLoading = true;
            // Format dates to YYYY-MM-DD
            const formValue = this.inventoryForm.value;
            // Exclude product_id from payload
            const { product_id, ...payloadData } = formValue;

            const payload = {
                ...payloadData,
                mfg_date: this.formatDate(formValue.mfg_date),
                expiry_date: this.formatDate(formValue.expiry_date)
            };

            // If inventoryId present, update; else create
            const obs = this.inventoryId
                ? this.inventoryService.updateInventory(this.inventoryId, payload)
                : this.inventoryService.createInventory(payload);

            obs.subscribe({
                next: (res) => {
                    this.isLoading = false;
                    const msg = this.inventoryId ? 'Inventory updated successfully!' : 'Inventory added successfully!';
                    this.snackBar.open(msg, 'Close', { duration: 3000 });
                    this.inventoryForm.reset();
                    // Reset filtered variants
                    this.filteredVariants = this.allVariants;
                    this.refresh.emit();
                    this.close.emit();
                },
                error: (err) => {
                    this.isLoading = false;
                    this.snackBar.open((this.inventoryId ? 'Error updating inventory: ' : 'Error adding inventory: ') + (err.error?.message || err.message), 'Close', { duration: 4000 });
                }
            });
        }
    }

    onClose() {
        this.close.emit();
    }

    formatDate(date: Date): string {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}
