import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UomService } from '../../../services/uom.service';
import { AddUomComponent } from '../add-uom/add-uom';

@Component({
    selector: 'app-uom-list',
    standalone: true,
    imports: [
        CommonModule,
        AddUomComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './uom-list.html',
    styleUrl: './uom-list.scss'
})
export class UomListComponent implements OnInit, AfterViewInit {
    private uomService = inject(UomService);

    displayedColumns: string[] = ['code', 'name', 'actions'];
    dataSource = new MatTableDataSource<any>([]);
    isLoading = false;
    errorMessage = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    // Modal State
    showModal = false;
    selectedUomId: string | null = null;

    ngOnInit() {
        this.loadUoms();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadUoms() {
        this.isLoading = true;
        this.uomService.getUoms().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const data = Array.isArray(response) ? response : (response.data || []);
                this.dataSource.data = data;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load UOMs.';
                this.isLoading = false;
                console.error('Error loading UOMs:', err);
            }
        });
    }

    deleteUom(id: string) {
        if (confirm('Are you sure you want to delete this UOM?')) {
            this.uomService.deleteUom(id).subscribe({
                next: () => {
                    this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
                },
                error: (err) => {
                    alert('Failed to delete UOM.');
                    console.error('Error deleting UOM:', err);
                }
            });
        }
    }

    openModal(id: string | null = null) {
        this.selectedUomId = id;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.selectedUomId = null;
    }

    onModalClose() {
        this.closeModal();
    }

    onModalRefresh() {
        this.closeModal();
        this.loadUoms();
    }
}
