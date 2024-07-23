import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  menuItems = [
    { label: 'General', icon: 'pi pi-home' },
    { label: 'Rendimiento', icon: 'pi pi-chart-line' },
    { label: 'Escuela', icon: 'pi pi-building' },
    { label: 'Juegos', icon: 'pi pi-crown' }
  ];
}
