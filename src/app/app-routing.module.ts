import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [

  {
    path: '',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path: 'gestion',
    component : CreateTeamComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
