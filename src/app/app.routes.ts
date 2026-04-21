import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { CitasComponent } from './pages/citas/citas';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout';
import { AdminCitasComponent } from './pages/admin/citas/admin-citas';
import { AdminServiciosComponent } from './pages/admin/servicios/admin-servicios';
import { AdminEmpleadosComponent } from './pages/admin/empleados/admin-empleados';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'citas', component: CitasComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'citas', pathMatch: 'full' },
      { path: 'citas', component: AdminCitasComponent },
      { path: 'servicios', component: AdminServiciosComponent },
      { path: 'empleados', component: AdminEmpleadosComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];