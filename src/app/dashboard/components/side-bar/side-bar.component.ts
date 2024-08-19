import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  menuItems: any[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.setupMenuItems();
  }

  setupMenuItems(): void {
    this.menuItems = [
      { label: 'General', icon: 'pi pi-cog', route: '/dashboard/general' },
      // Verificar si es Admin o Teacher para mostrar "Rendimiento"
      ...(this.authService.isAdmin() || this.authService.isTeacher() ?
        [{ label: 'Rendimiento', icon: 'pi pi-chart-line', route: '/dashboard/rendimiento' }] : []),
      // Verificar si es Admin o Teacher para mostrar "Gestión escolar"
      ...(this.authService.isAdmin() || this.authService.isTeacher() ?
        [{ label: 'Gestión escolar', icon: 'pi pi-graduation-cap', route: '/dashboard/gestion-escuela/school-handler' }] : []),
      /*...otros ítems que quieras agregar...*/
    ];
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
