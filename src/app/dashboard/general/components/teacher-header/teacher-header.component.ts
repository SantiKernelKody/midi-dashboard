import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-teacher-header',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, DropdownModule, FormsModule],
  templateUrl: './teacher-header.component.html',
  styleUrl: './teacher-header.component.css'
})
export class TeacherHeaderComponent {
  selectedGame: any;
  infoCards = [
    { title: 'Estudiantes', value: '100', icon: 'pi pi-users' },
    { title: 'Cursos registrados', value: '200', icon: 'pi pi-crown' },
  ];
  gameCards = [
    { title: 'Niños', value: '10', icon: 'pi pi-users' },
    { title: 'Cursos', value: '30', icon: 'pi pi-book' },
  ];
  games = [
    { label: 'Juego 1', value: '1' },
    { label: 'Juego 2', value: '2' },
    { label: 'Juego 3', value: '3' },
  ];
}
