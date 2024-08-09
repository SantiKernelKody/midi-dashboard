import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InfoCardComponent } from '../info-card/info-card.component';
import { DashboardService } from '../../service/general.service';
import { ChartBarComponent } from '../../../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../../../components/stacked-chart/stacked-chart.component';

@Component({
  selector: 'app-teacher-header',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, DropdownModule, FormsModule, ChartBarComponent, StackedChartComponent],
  templateUrl: './teacher-header.component.html',
  styleUrl: './teacher-header.component.css'
})
export class TeacherHeaderComponent {
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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getGames().subscribe(games => {
      this.games = games.map((game: { name: any; id: any; }) => ({ label: game.name, value: game.id }));
    });
    this.dashboardService.getGeneralHeaders('teacher').subscribe(data => {
      this.generalHeader = data;
      this.infoCards = [
        { title: 'Total Courses', value: data.total_courses, icon: 'pi pi-book' },
        { title: 'Total Players', value: data.total_players, icon: 'pi pi-users' }
      ];
    });
  }

  async onGameSelect(event: any): Promise<void> {
    const gameId = this.selectedGame.value;
    await this.dashboardService.getGameHeader('teacher', gameId).subscribe(data => {
      this.gameHeader = data;
      this.gameCards = [
        { title: 'Total Players', value: data.total_players, icon: 'pi pi-users' },
        { title: 'Total Courses', value: data.total_courses, icon: 'pi pi-book' }
      ];
    });
    // Fetching data for charts using the correct API endpoint
    this.dashboardService.getGeneralBody('teacher', gameId).subscribe(chartData => {
      this.barChartData1 = chartData.level_grades;
      this.barChartData2 = chartData.level_times;
      this.stackedChartData1 = chartData.level_states;
      this.stackedChartData2 = chartData.story_states;
    });
  }
}
