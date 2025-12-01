import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UomService } from '../../../services/uom.service';

@Component({
    selector: 'app-add-uom',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    templateUrl: './add-uom.html',
    styleUrl: './add-uom.scss'
})
export class AddUomComponent implements OnChanges {
    @Input() uomId: string | null = null;
    @Output() close = new EventEmitter<void>();
    @Output() refresh = new EventEmitter<void>();

    uomForm: FormGroup;
    isEditMode = false;
    isLoading = false;
    errorMessage = '';

    private fb = inject(FormBuilder);
    private uomService = inject(UomService);

    constructor() {
        this.uomForm = this.fb.group({
            code: ['', [Validators.required]],
            name: ['', [Validators.required]]
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['uomId']) {
            if (this.uomId) {
                this.isEditMode = true;
                this.loadUomDetails(this.uomId);
            } else {
                this.isEditMode = false;
                this.uomForm.reset();
            }
        }
    }

    loadUomDetails(id: string) {
        this.isLoading = true;
        this.uomService.getUomById(id).subscribe({
            next: (uom) => {
                this.uomForm.patchValue(uom);
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading UOM:', err);
                this.errorMessage = 'Failed to load UOM details.';
                this.isLoading = false;
            }
        });
    }

    onSubmit() {
        if (this.uomForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';
        const uomData = this.uomForm.value;

        if (this.isEditMode && this.uomId) {
            this.uomService.updateUom(this.uomId, uomData).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.refresh.emit();
                },
                error: (err) => {
                    console.error('Error updating UOM:', err);
                    this.errorMessage = err.error?.message || 'Failed to update UOM.';
                    this.isLoading = false;
                }
            });
        } else {
            this.uomService.addUom(uomData).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.refresh.emit();
                },
                error: (err) => {
                    console.error('Error adding UOM:', err);
                    this.errorMessage = err.error?.message || 'Failed to add UOM.';
                    this.isLoading = false;
                }
            });
        }
    }

    onCancel() {
        this.close.emit();
    }
}
