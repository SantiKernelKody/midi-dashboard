import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { SkillManagementService } from '../../service/skill-management.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  games: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(
    private gamesService: SkillManagementService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gamesService.getGames(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.games = data.games;
        this.totalItems = data.total_items;
      },
      error: (error) => {
        this.toastService.showError('Error', 'No se pudo cargar la lista de juegos.');
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.loadGames();
  }

  goToLevels(gameId: number): void {
    this.router.navigate([`/dashboard/juegos/level-list/${gameId}`]);
  }
}
