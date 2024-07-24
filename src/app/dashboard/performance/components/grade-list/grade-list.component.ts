import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule],
  templateUrl: './grade-list.component.html',
  styleUrl: './grade-list.component.css'
})
export class GradeListComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() firstColumnTitle: string = '';
  @Input() items: { label: string, score: number, id: string }[] = [];
}
