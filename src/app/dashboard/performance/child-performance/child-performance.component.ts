import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../general/service/general.service';
import { PerformanceService } from '../service/performance.service';
import { ChartBarComponent } from '../../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../../components/stacked-chart/stacked-chart.component';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-child-performance',
  standalone: true,
  imports: [ChartBarComponent, StackedChartComponent, DropdownModule, FormsModule, CommonModule, ButtonModule],
  templateUrl: './child-performance.component.html',
  styleUrl: './child-performance.component.css'
})
export class ChildPerformanceComponent {
  playerData: any = {};
  games: any[] = [];
  selectedGame: any;
  kidId: number = 0;

  // Variables para almacenar datos de las gráficas
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

  constructor(
    private performanceService: PerformanceService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Obtener el kid_id desde la URL
    this.kidId = +this.route.snapshot.paramMap.get('kid_id')!;

    // Obtener los datos del niño
    this.performanceService.getKidData(this.kidId).subscribe(data => {
      this.playerData = data;
    });

    // Cargar los juegos disponibles
    this.generalService.getGames().subscribe(games => {
      this.games = games.map((game: { name: string; id: number }) => ({
        label: game.name,
        value: game.id,
      }));
    });
  }
  goBack(): void {
    this.location.back();
  }

  onGameSelect(): void {
    if (this.selectedGame) {
      this.performanceService
        .getKidPerformance(this.kidId, this.selectedGame.value)
        .subscribe((data: any) => {
          // Asignar los datos obtenidos de la API
          this.levelGradesData = data.level_grades.data;
          this.levelGradesLabels = data.level_grades.labels;
          this.levelTimesData = data.level_times.data;
          this.levelTimesLabels = data.level_times.labels;
          this.levelStatesData = [
            { label: 'Completados', data: data.level_states.data[0].data, backgroundColor: data.level_states.data[0].backgroundColor },
            { label: 'Abandonados', data: data.level_states.data[1].data, backgroundColor: data.level_states.data[1].backgroundColor },
          ];
          this.levelStatesLabels = data.level_states.labels;
          this.storyStatesData = [
            { label: 'Completados', data: data.story_states.data[0].data, backgroundColor: data.story_states.data[0].backgroundColor },
            { label: 'Abandonados', data: data.story_states.data[1].data, backgroundColor: data.story_states.data[1].backgroundColor },
          ];
          this.storyStatesLabels = data.story_states.labels;
          this.storyTimesData = data.story_times.data;
          this.storyTimesLabels = data.story_times.labels;
        });
    }
  }
  editChildInfo(): void {
    this.router.navigate(['/dashboard/gestion-escuela/player-handler/update', this.kidId]);
  }

}
