import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { GeneralComponent } from './general/general.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideBarComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    MenuModule,
    ButtonModule,
    GeneralComponent
  ]
})
export class DashboardModule { }
