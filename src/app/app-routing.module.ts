import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTableComponent } from './my-table/my-table.component';
import { MyDashComponent } from './my-dash/my-dash.component';
import { NewFormComponent } from './new-form/new-form.component';

const routes: Routes = [
  { path: '', component: MyDashComponent},
  { path: 'lista', component: MyTableComponent},
  { path: 'nuevo', component: NewFormComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
