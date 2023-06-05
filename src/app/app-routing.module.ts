import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes=[
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path: 'dashboard',component: DashboardComponent},
  {path: 'section',component: PagesComponent},
  {path: 'statistics',component: StatisticsComponent},
  {path: 'pages',component: PagesComponent},
  {path: 'settings',component: DashboardComponent},
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
