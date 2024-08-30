import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card/info-card.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../service/general.service';
import { ChartBarComponent } from '../../../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../../../components/stacked-chart/stacked-chart.component';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, DropdownModule, FormsModule, ChartBarComponent, StackedChartComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  generalHeader: any;
  gameHeader: any;
  games: any[] = [];
  selectedGame: any;
  infoCards: any[] = [];
  gameCards: any[] = [];

  // Data for charts
  barChartData1: any;
  barChartData2: any;
  stackedChartData1: any;
  stackedChartData2: any;

  constructor(private dashboardService: GeneralService) { }

  ngOnInit(): void {
    this.dashboardService.getGames().subscribe(games => {
      this.games = games.map((game: { name: any; id: any; }) => ({ label: game.name, value: game.id }));
    });
    this.dashboardService.getGeneralHeaders('admin').subscribe(data => {
      this.generalHeader = data;
      this.infoCards = [
        { title: 'Numero de niños', value: data.total_players, icon: 'pi pi-users' },
        { title: 'Numero de juegos', value: data.total_games, icon: 'pi pi-crown' },
        { title: 'Numero de capitulos', value: data.total_chapters, icon: 'pi pi-book' },
        { title: 'Numero de niveles', value: data.total_levels, icon: 'pi pi-bars' }
      ];
    });
  }

  async onGameSelect(event: any): Promise<void> {
    const gameId = this.selectedGame.value;
    await this.dashboardService.getGameHeader('admin', gameId).subscribe(data => {
      this.gameHeader = data;
      this.gameCards = [
        { title: 'Numero de niños', value: data.total_players, icon: 'pi pi-users' },
        { title: 'Capitulos del juego', value: data.total_chapters, icon: 'pi pi-book' },
        { title: 'Numero de niveles', value: data.total_levels, icon: 'pi pi-bars' }
      ];
    });
    // Fetching data for charts using the correct API endpoint
    this.dashboardService.getGeneralBody('admin', gameId).subscribe(chartData => {
      this.barChartData1 = chartData.level_grades;
      this.barChartData2 = chartData.level_times;
      this.stackedChartData1 = chartData.level_states;
      this.stackedChartData2 = chartData.story_states;
    });
  }


}
