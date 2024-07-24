import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card/info-card.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, DropdownModule, FormsModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  selectedGame: any;
  infoCards = [
    { title: 'Niños registrados', value: '100', icon: 'pi pi-users' },
    { title: 'Juegos disponibles', value: '200', icon: 'pi pi-crown' },
    { title: 'Capitulos disponibles', value: '300', icon: 'pi pi-book' },
    { title: 'Niveles disponibles', value: '300', icon: 'pi pi-bars' }
  ];
  gameCards = [
    { title: 'Niños registrados', value: '10', icon: 'pi pi-users' },
    { title: 'Capitulos disponibles', value: '30', icon: 'pi pi-book' },
    { title: 'Niveles disponibles', value: '30', icon: 'pi pi-bars' }
  ];
  games = [
    { label: 'Juego 1', value: '1' },
    { label: 'Juego 2', value: '2' },
    { label: 'Juego 3', value: '3' },
  ];

}
