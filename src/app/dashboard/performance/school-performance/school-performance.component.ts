import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChartBarComponent } from '../../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../../components/stacked-chart/stacked-chart.component';
import { GradeListComponent } from '../components/grade-list/grade-list.component';
import { PerformanceService } from '../service/performance.service';
import { GeneralService } from '../../general/service/general.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-school-performance',
  standalone: true,
  imports: [DropdownModule, FormsModule, CalendarModule, ChartBarComponent, StackedChartComponent, GradeListComponent, CommonModule],
  templateUrl: './school-performance.component.html',
  styleUrl: './school-performance.component.css'
})
export class SchoolPerformanceComponent {
  schools: any[] = [];
  stages: any[] = [];
  games: any[] = [];
  selectedSchool: any;
  selectedStage: any;
  selectedGame: any;
  rangeDates: Date[] = [];


  // Variables para almacenar datos de las gráficas y listas
  levelGradesData: number[] = [];
  levelGradesLabels: string[] = [];

  levelTimesData: number[] = [];
  levelTimesLabels: string[] = [];

  levelStatesData: any[] = [];
  levelStatesLabels: string[] = [];

  storyStatesData: any[] = [];
  storyStatesLabels: string[] = [];

  storyTimesData: number[] = [];
  storyTimesLabels: string[] = [];

  items: { label: string; score: number; id: string }[] = [];


  constructor(private performanceService: PerformanceService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.performanceService.getSchoolsAdmin().subscribe(data => {
      this.schools = data.map((school: { name: any; id: any; }) => ({ label: school.name, value: school.id }));
    });

    this.performanceService.getStages().subscribe(data => {
      console.log("data STAGE: ", data);
      this.stages = data.map((stage: { name: any; id: any; }) => ({ label: stage.name, value: stage.id }));
    });

    this.generalService.getGames().subscribe((data: { name: any; id: any; }[]) => {
      this.games = data.map((game: { name: any; id: any; }) => ({ label: game.name, value: game.id }));
    });
  }

  onFilterChange(): void {
    console.log(this.selectedSchool, this.selectedStage, this.selectedGame, this.rangeDates);
    if (this.selectedSchool && this.selectedStage && this.selectedGame && this.rangeDates.length === 2) {
      const startDate = this.rangeDates[0].toISOString().split('T')[0];
      const endDate = this.rangeDates[1].toISOString().split('T')[0];

      this.performanceService.getPerformanceSchool(this.selectedSchool.value, startDate, endDate, this.selectedStage.value, this.selectedGame.value).subscribe(data => {

        // Asignar datos y etiquetas para cada gráfica y lista por separado
        this.levelGradesData = data.level_grades.data;
        this.levelGradesLabels = data.level_grades.labels;

        this.levelTimesData = data.level_times.data;
        this.levelTimesLabels = data.level_times.labels;

        this.levelStatesData = data.level_states.data;
        this.levelStatesLabels = data.level_states.labels;

        this.storyStatesData = data.story_states.data;
        this.storyStatesLabels = data.story_states.labels;

        this.storyTimesData = data.story_times.data;
        this.storyTimesLabels = data.story_times.labels;

        this.items = data.Course_list.map((course: { name_curso: any; id_curso: any; promedio_curso_juego: any; }) => ({
          label: course.name_curso,
          score: course.promedio_curso_juego,
          id: course.id_curso
        }));
      });
    }
  }
}
