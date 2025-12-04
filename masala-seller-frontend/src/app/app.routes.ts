import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CategoryListComponent } from './pages/admin/category-list/category-list';
import { SubCategoryListComponent } from './pages/admin/sub-category-list/sub-category-list';
import { WarehouseListComponent } from './pages/admin/warehouse-list/warehouse-list';
import { UomListComponent } from './pages/admin/uom-list/uom-list';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
            {
                path: 'categories',
                component: CategoryListComponent
            },
            {
                path: 'sub-categories',
                component: SubCategoryListComponent
            },
            {
                path: 'warehouses',
                component: WarehouseListComponent
            },
            {
                path: 'uom',
                component: UomListComponent
            },
            {
                path: 'product-variants',
                loadComponent: () => import('./pages/admin/product-variant-list/product-variant-list').then(m => m.ProductVariantListComponent)
            },
            {
                path: 'inventory',
                loadComponent: () => import('./pages/admin/inventory-list/inventory-list.component').then(m => m.InventoryListComponent)
            }
        ]
    },

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
