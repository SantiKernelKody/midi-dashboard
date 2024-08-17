import { Component } from '@angular/core';
import { SchoolManagementService } from '../../school-management.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../../../services/toast.service';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, TableModule, TabViewModule],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent {
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
