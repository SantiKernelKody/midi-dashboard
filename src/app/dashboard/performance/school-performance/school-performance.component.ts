import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChartBarComponent } from '../../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../../components/stacked-chart/stacked-chart.component';
import { GradeListComponent } from '../components/grade-list/grade-list.component';

@Component({
  selector: 'app-school-performance',
  standalone: true,
  imports: [DropdownModule, FormsModule, CalendarModule, ChartBarComponent, StackedChartComponent, GradeListComponent],
  templateUrl: './school-performance.component.html',
  styleUrl: './school-performance.component.css'
})
export class SchoolPerformanceComponent {
  selectedStage: any;
  selectedSchool: any;
  selectedGame: any;
  labels = ['ex1', 'ex2', 'ex3'];
  data = [10, 20, 30];
  stages = [{ label: 'R0', value: 1 }, { label: 'R1', value: 2 }, { label: 'R2', value: 3 }];
  rangeDates: Date[] = [];
  schools = [{ label: 'School 1', value: '1' }, { label: 'School 2', value: '2' }, { label: 'School 3', value: '3' }];
  games = [
    { label: 'Juego 1', value: '1' },
    { label: 'Juego 2', value: '2' },
    { label: 'Juego 3', value: '3' },
  ];
  items = [
    { label: 'Ciencias-1ero', score: 8.5, id: '1' },
    { label: 'Ciencias-2do', score: 9.0, id: '2' },
    { label: 'Compu-3ero', score: 9.5, id: '3' },
    { label: 'Ciencias-1ero', score: 8.5, id: '1' },
    { label: 'Ciencias-2do', score: 9.0, id: '2' },
    { label: 'Compu-3ero', score: 9.5, id: '3' }
  ];
}
