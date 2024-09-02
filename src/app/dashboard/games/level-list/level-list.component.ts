import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { SkillManagementService } from '../../service/skill-management.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-level-list',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './level-list.component.html',
  styleUrl: './level-list.component.css'
})
export class LevelListComponent {
  levels: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  gameId: number = 0;

  constructor(
    private gameService: SkillManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('gameId')!;
    this.loadLevels();
  }

  loadLevels(): void {
    this.gameService.getLevelsForGame(this.gameId, this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.levels = data.levels;
        this.totalItems = data.total_items;
      },
      (error) => {
        this.toastService.showError('Error', 'Failed to load levels');
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.loadLevels();
  }

  editLevel(levelId: number): void {
    this.router.navigate([`/dashboard/juegos/level-update/${levelId}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
