import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, TableModule, TabViewModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  activeTab: number = 0;
  courses: any[] = [];
  teachers: any[] = [];
  totalCourses: number = 0;
  totalTeachers: number = 0;
  pageSize: number = 10;
  loadingCourses: boolean = false;
  loadingTeachers: boolean = false;
  firstCourses: number = 0;
  firstTeachers: number = 0;
  schoolId: number = 0;

  constructor(
    private schoolService: SchoolManagementService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.schoolId = +this.route.snapshot.paramMap.get('school_id')!;
    this.loadCourses({ first: this.firstCourses, rows: this.pageSize });
    if (this.authService.isAdmin()) {
      this.loadTeachers({ first: this.firstTeachers, rows: this.pageSize });
    }
  }

  loadCourses(event: any): void {
    this.loadingCourses = true;
    const page = event.first / event.rows + 1;
    this.schoolService.getCourses(this.schoolId, page, event.rows).subscribe(
      (data) => {
        this.courses = data.courses;
        this.totalCourses = data.total_items;
        this.loadingCourses = false;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los cursos');
        this.loadingCourses = false;
      }
    );
  }

  loadTeachers(event: any): void {
    this.loadingTeachers = true;
    const page = event.first / event.rows + 1;
    this.schoolService.getTeachers(this.schoolId, page, event.rows).subscribe(
      (data) => {
        this.teachers = data.teachers;
        this.totalTeachers = data.total_items;
        this.loadingTeachers = false;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los profesores');
        this.loadingTeachers = false;
      }
    );
  }

  createCourse(): void {
    this.router.navigate([`/dashboard/gestion-escuela/course-handler/create-course`, this.schoolId]);
  }

  createTeacher(): void {
    this.router.navigate([`/dashboard/gestion-escuela/course-handler/create-teacher`, this.schoolId]);
  }

  editCourse(courseId: number): void {
    this.router.navigate([`/dashboard/gestion-escuela/course-handler/edit-course`, courseId]);
  }

  deleteCourse(courseId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este curso?')) {
      this.schoolService.deleteCourse(courseId).subscribe(
        () => {
          this.loadCourses({ first: this.firstCourses, rows: this.pageSize });
          this.toastService.showSuccess('Éxito', 'Curso eliminado con éxito');
        },
        (error) => {
          this.toastService.showError('Error', 'Error al eliminar el curso');
        }
      );
    }
  }

  deleteTeacher(teacherId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este profesor?')) {
      this.schoolService.deleteTeacher(teacherId).subscribe(
        () => {
          this.loadTeachers({ first: this.firstTeachers, rows: this.pageSize });
          this.toastService.showSuccess('Éxito', 'Profesor eliminado con éxito');
        },
        (error) => {
          this.toastService.showError('Error', 'Error al eliminar el profesor');
        }
      );
    }
  }

  goToPlayers(courseId: number): void {
    this.router.navigate(['/dashboard/gestion-escuela/player-handler/list', courseId]);
  }

  shouldShowCreateCourseButton(): boolean {
    return this.authService.isTeacher();
  }

  shouldShowTeacherTab(): boolean {
    return this.authService.isAdmin();
  }

  goBack(): void {
    this.location.back();
  }
}
