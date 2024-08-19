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
  activeTab: number = 0; // Controla cuál tab está activo
  courses: any[] = [];
  teachers: any[] = [];
  schoolId: number = 0; // Para almacenar el school_id recibido

  constructor(
    private schoolService: SchoolManagementService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Obtener el school_id desde la ruta
    this.schoolId = +this.route.snapshot.paramMap.get('school_id')!;

    // Cargar cursos y profesores asociados a la escuela
    this.loadCourses();
    if (this.authService.isAdmin()) {
      this.loadTeachers();
    }
  }

  loadCourses(): void {
    this.schoolService.getCourses(this.schoolId).subscribe(
      (data) => {
        this.courses = data;
        console.log("Courses", this.courses);
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los cursos');
      }
    );
  }

  loadTeachers(): void {
    this.schoolService.getTeachers(this.schoolId).subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los profesores');
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
          this.loadCourses();
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
          this.loadTeachers();
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
