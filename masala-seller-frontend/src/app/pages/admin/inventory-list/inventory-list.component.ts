import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';

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
        RouterModule
    ],
    templateUrl: './inventory-list.component.html',
    styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['variant', 'warehouse', 'qty_on_hand', 'qty_reserved', 'cost_per_unit', 'mfg_date', 'expiry_date'];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;
    errorMessage = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private inventoryService: InventoryService,
        private router: Router
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

    navigateToAdd() {
        this.router.navigate(['/admin/inventory/add']);
    }
}
