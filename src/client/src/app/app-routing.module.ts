import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/infrastructure/auth-guard';
import { SettingsComponent } from './settings/settings.component';
import { SubrogationComponent } from './subrogation/subrogation.component';
import { EqualizationComponent } from './equalization/equalization.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'subrogation', component: SubrogationComponent, canActivate: [AuthGuard] },
  { path: 'equalization', component: EqualizationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
