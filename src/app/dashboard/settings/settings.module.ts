import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { GeneralComponent } from '../general/general.component';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';


@NgModule({
  declarations: [
    SettingsPanelComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CommonModule,
    RouterModule,
    MenuModule,
    ButtonModule,
    HttpClientModule,
    GeneralComponent,
    InputTextModule,
    FormsModule,
  ]
})
export class SettingsModule { }
