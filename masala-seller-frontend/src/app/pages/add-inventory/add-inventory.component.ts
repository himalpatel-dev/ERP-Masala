import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

import { InventoryService } from '../../services/inventory.service';
import { ProductService } from '../../services/product.service';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
    selector: 'app-add-inventory',
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
export class AddInventoryComponent implements OnInit {
    inventoryForm: FormGroup;
    variants: any[] = [];
    warehouses: any[] = [];

    constructor(
        private fb: FormBuilder,
        private inventoryService: InventoryService,
        private productService: ProductService,
        private warehouseService: WarehouseService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        this.inventoryForm = this.fb.group({
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
        this.loadVariants();
        this.loadWarehouses();
    }

    loadVariants() {
        this.productService.getAllVariantsProductWise().subscribe({
            next: (data) => {
                this.variants = data;
            },
            error: (err) => console.error('Error loading variants', err)
        });
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
            // Format dates to YYYY-MM-DD
            const formValue = this.inventoryForm.value;
            const payload = {
                ...formValue,
                mfg_date: this.formatDate(formValue.mfg_date),
                expiry_date: this.formatDate(formValue.expiry_date)
            };

            this.inventoryService.createInventory(payload).subscribe({
                next: (res) => {
                    this.snackBar.open('Inventory added successfully!', 'Close', { duration: 3000 });
                    this.router.navigate(['/admin/inventory']);
                    this.inventoryForm.reset();
                },
                error: (err) => {
                    this.snackBar.open('Error adding inventory: ' + err.error.message, 'Close', { duration: 3000 });
                }
            });
        }
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
