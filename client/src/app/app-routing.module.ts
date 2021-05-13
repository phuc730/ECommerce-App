import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
// import {DashboardComponent} from './app/views/dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component'
const routes: Routes = [
  { path: '', component: HomeComponent, data: {breadcrumb: 'Home'} },
  // { path: 'admin',canActivate: [AuthGuard, AdminGuard], component: AdminComponent, data: {breadcrumb: 'Admin'} },
  { path: 'admin', canActivate: [AuthGuard, AdminGuard], loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), data: {breadcrumb: 'Admin'} },
  { path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'} },
  { path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'} },
  { path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'} },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Store'} },
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), data: {breadcrumb: 'Basket'} },
  // tslint:disable-next-line: max-line-length
  { path: 'checkout', canActivate: [AuthGuard], loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: {breadcrumb: 'Checkout'} },
  // tslint:disable-next-line: max-line-length
  { path: 'orders', canActivate: [AuthGuard], loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule), data: {breadcrumb: 'Orders'} },
  // tslint:disable-next-line: max-line-length
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: {breadcrumb: {skip: true }} },
   // { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
