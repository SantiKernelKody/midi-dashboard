import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  menuItems: any[] = [];
  activeRoute: string = '';  // Para rastrear la ruta activa

  constructor(private router: Router, private authService: AuthService) {
    this.setupMenuItems();
  }

  ngOnInit(): void {
    // Inicializar la ruta activa
    this.activeRoute = this.router.url;

    // Escuchar los cambios de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  setupMenuItems(): void {
    this.menuItems = [
      { label: 'General', icon: 'pi pi-cog', route: '/dashboard/general' },
      ...(this.authService.isAdmin() || this.authService.isTeacher() ? [
        { label: 'Rendimiento', icon: 'pi pi-chart-line', route: '/dashboard/rendimiento' },
        { label: 'Gestión escolar', icon: 'pi pi-graduation-cap', route: '/dashboard/gestion-escuela/school-handler' }
      ] : []),
      ...(this.authService.isAdmin() ? [
        { label: 'Habilidades', icon: 'pi pi-star', route: '/dashboard/skills' },
        { label: 'Juegos', icon: 'pi pi-crown', route: '/dashboard/juegos' },
      ] : [])
    ];
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    // Verificar si la ruta actual incluye la ruta base
    return this.activeRoute.includes(route);
  }
}
