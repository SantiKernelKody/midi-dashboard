import { Component } from '@angular/core';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  menuItems = [
    { label: 'General', icon: 'pi pi-cog' },
    { label: 'Rendimiento', icon: 'pi pi-chart-line' },
    { label: 'Escuela', icon: 'pi pi-graduation-cap' },
    { label: 'Juegos', icon: 'pi pi-crown' }
  ];
}
