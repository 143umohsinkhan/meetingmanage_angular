import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { CreatemeetingComponent } from './components/createmeeting/createmeeting.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes = [
  {path: '', component: LoginComponent},
  {path: 'list', component: ManageComponent,canActivate:[AuthGuard]},
  {path: 'manage/:id', component: CreatemeetingComponent,canActivate:[AuthGuard]},
  {path: 'manage', component: CreatemeetingComponent,canActivate:[AuthGuard]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
