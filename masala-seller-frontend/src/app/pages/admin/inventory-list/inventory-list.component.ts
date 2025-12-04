import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { AddInventoryModalComponent } from '../add-inventory/add-inventory.component';

// Inventory List Component - Trigger Rebuild
@Component({
    selector: 'app-inventory-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatIconModule,
        RouterModule,
        AddInventoryModalComponent
    ],
    templateUrl: './inventory-list.component.html',
    styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit, AfterViewInit {
    // include actions column for edit/delete
    displayedColumns: string[] = ['variant', 'warehouse', 'qty_on_hand', 'qty_reserved', 'cost_per_unit', 'mfg_date', 'expiry_date', 'actions'];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;
    errorMessage = '';
    showModal = false;
    selectedInventoryId: string | null = null;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private inventoryService: InventoryService
    ) { }

    ngOnInit(): void {
        this.loadInventory();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadInventory() {
        this.isLoading = true;
        this.inventoryService.getAllInventory().subscribe({
            next: (data) => {
                this.isLoading = false;
                console.log('Inventory Data:', data); // Debug log
                // Ensure data is an array. If backend returns object with data property, adjust here.
                this.dataSource.data = Array.isArray(data) ? data : (data.data || []);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = 'Failed to load inventory.';
                console.error('Error loading inventory:', err);
            }
        });
    }

    openModal(id: string | null = null) {
        console.log('openModal called, id=', id);
        this.selectedInventoryId = id;
        this.showModal = true;
    }

    editInventory(id: string) {
        // open modal in edit mode
        this.openModal(id);
    }

    deleteInventory(id: string) {
        if (!confirm('Are you sure you want to delete this inventory record?')) return;
        this.inventoryService.deleteInventory(id).subscribe({
            next: () => {
                this.loadInventory();
            },
            error: (err) => {
                console.error('Failed to delete inventory', err);
                alert('Failed to delete inventory.');
            }
        });
    }

    closeModal() {
        this.showModal = false;
        this.selectedInventoryId = null;
    }

    onModalClose() {
        this.closeModal();
    }

    onModalRefresh() {
        this.closeModal();
        this.loadInventory();
    }
}
