import { Component } from '@angular/core';
import { PerformanceService } from '../service/performance.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChartBarComponent } from '../../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../../components/stacked-chart/stacked-chart.component';
import { GradeListComponent } from '../components/grade-list/grade-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../general/service/general.service';

@Component({
  selector: 'app-course-performance',
  standalone: true,
  imports: [DropdownModule, FormsModule, CalendarModule, ChartBarComponent, StackedChartComponent, GradeListComponent, CommonModule],
  templateUrl: './course-performance.component.html',
  styleUrl: './course-performance.component.css'
})
export class CoursePerformanceComponent {
  courses: any[] = [];
  stages: any[] = [];
  games: any[] = [];
  selectedCourse: any;
  selectedSchool: any;
  rangeDates: Date[] = [];
  selectedStage: any;
  selectedGame: any;

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

  students: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private performanceService: PerformanceService,
    private generalService: GeneralService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.loadSavedFilters();
  }

  loadInitialData(): void {
    // Capturar el course_id y school_id desde la URL
    const schoolId = +this.route.snapshot.paramMap.get('school_id')!;
    const courseId = +this.route.snapshot.paramMap.get('course_id')!;

    // Cargar la lista de cursos basados en el school_id
    this.performanceService.getCourses(schoolId).subscribe(response => {
      const courses = response.courses || [];
      this.courses = courses.map((course: { name: any; id: any; }) => ({ label: course.name, value: course.id }));

      // Seleccionar el curso automáticamente si courseId está presente
      if (courseId) {
        this.selectedCourse = this.courses.find(course => course.value === courseId);

        // Ejecutar la lógica para cargar los datos del curso seleccionado
        if (this.selectedCourse) {
          this.onCourseSelect();
        }
      }
    });

    // Cargar dropdowns de stages y juegos
    this.performanceService.getStages().subscribe(stages => {
      this.stages = stages.map((stage: { name: any; id: any; }) => ({ label: stage.name, value: stage.id }));
    });

    this.generalService.getGames().subscribe(games => {
      this.games = games.map((game: { name: any; id: any; }) => ({ label: game.name, value: game.id }));
    });
  }

  loadSavedFilters(): void {
    const savedFilters = localStorage.getItem('coursePerformanceFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      this.selectedCourse = filters.selectedCourse;
      this.selectedStage = filters.selectedStage;
      this.selectedGame = filters.selectedGame;
      this.rangeDates = filters.rangeDates.map((date: string) => new Date(date));

      // Re-ejecutar el filtro si todos los filtros están seleccionados
      if (this.allFiltersSelected()) {
        this.onCourseSelect();
      }
    }
  }

  saveFilters(): void {
    const filters = {
      selectedCourse: this.selectedCourse,
      selectedStage: this.selectedStage,
      selectedGame: this.selectedGame,
      rangeDates: this.rangeDates.map(date => date.toISOString())
    };
    localStorage.setItem('coursePerformanceFilters', JSON.stringify(filters));
  }

  allFiltersSelected(): boolean {
    return (
      this.selectedCourse &&
      this.rangeDates.length === 2 &&
      this.selectedStage &&
      this.selectedGame
    );
  }

  onCourseSelect(): void {
    this.saveFilters();

    if (this.allFiltersSelected()) {
      const startDate = this.rangeDates ? this.rangeDates[0].toISOString().split('T')[0] : null;
      const endDate = this.rangeDates ? this.rangeDates[1].toISOString().split('T')[0] : null;

      this.performanceService.getPerformanceCourse(
        this.selectedCourse.value,
        startDate,
        endDate,
        this.selectedStage ? this.selectedStage.value : 0,
        this.selectedGame ? this.selectedGame.value : 0
      ).subscribe(data => {
        this.levelGradesData = data.level_grades.data;
        this.levelGradesLabels = data.level_grades.labels;

        this.levelTimesData = data.level_times.data;
        this.levelTimesLabels = data.level_times.labels;

        this.levelStatesData = [
          { label: 'Completados', data: data.level_states.data[0]?.data || [] },
          { label: 'Abandonados', data: data.level_states.data[1]?.data || [] }
        ];
        this.levelStatesLabels = data.level_states.labels;

        this.storyStatesData = [
          { label: 'Completados', data: data.story_states.data[0]?.data || [] },
          { label: 'Abandonados', data: data.story_states.data[1]?.data || [] }
        ];
        this.storyStatesLabels = data.story_states.labels;

        this.storyTimesData = data.story_times.data;
        this.storyTimesLabels = data.story_times.labels;

        this.students = data.student_list.map((student: { name: string; average_score: number; id: number }) => ({
          label: student.name,
          score: student.average_score,
          id: student.id
        }));
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
  getLink(): string {
    return `/dashboard/rendimiento/jugador`;
  }
}

