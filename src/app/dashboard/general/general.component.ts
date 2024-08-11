import { Component } from '@angular/core';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { ParentHeaderComponent } from './components/parent-header/parent-header.component';
import { TeacherHeaderComponent } from './components/teacher-header/teacher-header.component';
import { ChartBarComponent } from '../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../components/stacked-chart/stacked-chart.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [AdminHeaderComponent, ParentHeaderComponent, TeacherHeaderComponent, ChartBarComponent, StackedChartComponent, CommonModule],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
  role: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtener el rol del usuario actual desde el AuthService
    this.role = this.authService.getUserRole(); // Suponiendo que tienes un método para obtener el rol
  }
}
