import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseService } from '../../../services/warehouse';

@Component({
    selector: 'app-add-warehouse',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-warehouse.html',
    styleUrl: './add-warehouse.scss'
})
export class AddWarehouseComponent implements OnInit {
    @Input() warehouseId: string | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() refresh = new EventEmitter<void>();

    warehouseForm: FormGroup;
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private warehouseService: WarehouseService
    ) {
        this.warehouseForm = this.fb.group({
            name: ['', [Validators.required]],
            code: ['', [Validators.required]],
            address: ['', [Validators.required]],
            is_active: [true]
        });
    }

    ngOnInit() {
        if (this.warehouseId) {
            this.loadWarehouse();
        }
    }

    loadWarehouse() {
        this.isLoading = true;
        this.warehouseService.getWarehouseById(this.warehouseId!).subscribe({
            next: (data) => {
                this.warehouseForm.patchValue({
                    name: data.name,
                    code: data.code,
                    address: data.address,
                    is_active: data.is_active
                });
                this.isLoading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load warehouse details.';
                this.isLoading = false;
                console.error(err);
            }
        });
    }

    onSubmit() {
        if (this.warehouseForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';

        const warehouseData = this.warehouseForm.value;

        const request = this.warehouseId
            ? this.warehouseService.updateWarehouse(this.warehouseId, warehouseData)
            : this.warehouseService.addWarehouse(warehouseData);

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
