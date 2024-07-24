import { Component } from '@angular/core';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { ParentHeaderComponent } from './components/parent-header/parent-header.component';
import { TeacherHeaderComponent } from './components/teacher-header/teacher-header.component';
import { ChartBarComponent } from '../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../components/stacked-chart/stacked-chart.component';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [AdminHeaderComponent, ParentHeaderComponent, TeacherHeaderComponent, ChartBarComponent, StackedChartComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
  labels = ['ex1', 'ex2', 'ex3'];
  data = [10, 20, 30];
  dataset = [{ label: 'Completados', data: [10, 8], backgroundColor: '#5FC4EA' }, { label: 'Abandonados', data: [5, 3], backgroundColor: '#A7F582' }];
  labels2 = ['Capitulo 1', 'Capitulo2 '];
}
