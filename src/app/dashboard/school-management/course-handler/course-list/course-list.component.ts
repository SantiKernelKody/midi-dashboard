import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';

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

  constructor(
    private schoolService: SchoolManagementService,
    private toastService: ToastService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadCourses();
    this.loadTeachers();
  }

  loadCourses(): void {
    this.schoolService.getCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los cursos');
      }
    );
  }

  loadTeachers(): void {
    this.schoolService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los profesores');
      }
    );
  }

  createCourse(): void {
    this.router.navigate(['/course-handler/create-course']);
  }

  createTeacher(): void {
    this.router.navigate(['/dashboard/gestion-escuela/course-handler/create-teacher']);
  }

  editCourse(courseId: number): void {
    this.router.navigate(['/course-handler/edit-course', courseId]);
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
}
