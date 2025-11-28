import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { WarehouseService } from '../../../services/warehouse';
import { AddWarehouseComponent } from '../add-warehouse/add-warehouse';

@Component({
    selector: 'app-warehouse-list',
    standalone: true,
    imports: [
        CommonModule,
        AddWarehouseComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
    templateUrl: './warehouse-list.html',
    styleUrl: './warehouse-list.scss'
})
export class WarehouseListComponent implements OnInit, AfterViewInit {
    private warehouseService = inject(WarehouseService);

    displayedColumns: string[] = ['name', 'code', 'address', 'status', 'actions'];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;
    errorMessage = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    // Modal State
    showModal = false;
    selectedWarehouseId: string | null = null;

    ngOnInit() {
        this.loadWarehouses();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadWarehouses() {
        this.isLoading = true;
        this.warehouseService.getWarehouses().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const data = Array.isArray(response) ? response : (response.data || []);
                this.dataSource.data = data;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load warehouses.';
                this.isLoading = false;
                console.error('Error loading warehouses:', err);
            }
        });
    }

    deleteWarehouse(id: string) {
        if (confirm('Are you sure you want to delete this warehouse?')) {
            this.warehouseService.deleteWarehouse(id).subscribe({
                next: () => {
                    this.dataSource.data = this.dataSource.data.filter(w => w.warehouse_id !== id);
                },
                error: (err) => {
                    alert('Failed to delete warehouse.');
                    console.error('Error deleting warehouse:', err);
                }
            });
        }
    }

    openModal(id: string | null = null) {
        this.selectedWarehouseId = id;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.selectedWarehouseId = null;
    }

    onModalClose() {
        this.closeModal();
    }

    onModalRefresh() {
        this.closeModal();
        this.loadWarehouses();
    }
}
