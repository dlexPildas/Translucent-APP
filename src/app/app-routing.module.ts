import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/videogames', pathMatch: 'full' },
  { path: 'videogames', loadChildren: () => import('./videogames/videogames.module').then(m => m.VideogamesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
