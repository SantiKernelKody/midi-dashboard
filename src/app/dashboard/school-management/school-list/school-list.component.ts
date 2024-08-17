import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SchoolManagementService } from '../school-management.service';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [ConfirmationService, MessageService],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent {
  schools: any[] = [];
  totalRecords: number = 0;

  constructor(
    private schoolService: SchoolManagementService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadSchools({ first: 0, rows: 10 });
  }

  loadSchools(event: any): void {
    const page = event.first / event.rows + 1;
    const size = event.rows;

    this.schoolService.getSchools(page, size).subscribe(response => {
      this.schools = response;
      this.totalRecords = response.length;  // Cambia esto según la respuesta real del servidor
    });
  }

  onCreate(): void {
    this.router.navigate(['/school-management/create']);
  }

  onEdit(school: any): void {
    this.router.navigate(['/school-management/edit', school.id]);
  }

  onDelete(schoolId: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar esta escuela?',
      accept: () => {
        this.schoolService.deleteSchool(schoolId).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'School deleted successfully' });
          this.loadSchools({ first: 0, rows: 10 });
        });
      }
    });
  }
}
