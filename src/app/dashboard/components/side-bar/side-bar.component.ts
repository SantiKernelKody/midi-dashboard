import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  menuItems = [
    { label: 'General', icon: 'pi pi-cog', route: '/dashboard/general' },
    { label: 'Rendimiento', icon: 'pi pi-chart-line', route: '/dashboard/rendimiento' },
    { label: 'Gestion escolar', icon: 'pi pi-graduation-cap', route: '/dashboard/gestion-escuela/school-handler' },
    { label: 'Juegos', icon: 'pi pi-crown', route: '/dashboard/games' },
  ];
  constructor(private router: Router) { }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
