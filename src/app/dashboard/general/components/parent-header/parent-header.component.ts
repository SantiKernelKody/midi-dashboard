import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InfoCardComponent } from '../info-card/info-card.component';
import { DashboardService } from '../../service/general.service';
import { ChartBarComponent } from '../../../components/bar-chart/bar-chart.component';
import { StackedChartComponent } from '../../../components/stacked-chart/stacked-chart.component';

@Component({
  selector: 'app-parent-header',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, DropdownModule, FormsModule, ChartBarComponent, StackedChartComponent],
  templateUrl: './parent-header.component.html',
  styleUrl: './parent-header.component.css'
})
export class ParentHeaderComponent {
  kidList: any[] = [];
  games: any[] = [];
  selectedKid: any;
  selectedGame: any;
  // Data for charts
  barChartData1: any;
  barChartData2: any;
  stackedChartData1: any;
  stackedChartData2: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getKidList().subscribe(data => {
      this.kidList = data.map((kid: { full_name: any; id: any; }) => ({ label: kid.full_name, value: kid.id }));
    });
    this.dashboardService.getGames().subscribe(games => {
      this.games = games.map((game: { name: any; id: any; }) => ({ label: game.name, value: game.id }));
    });
  }
  onSelectionChange(): void {
    const gameId = this.selectedGame?.value;
    const kidId = this.selectedKid?.value;

    if (gameId && kidId) {
      this.dashboardService.getGeneralBody('parent', gameId, kidId).subscribe(chartData => {
        this.barChartData1 = chartData.level_grades;
        this.barChartData2 = chartData.level_times;
        this.stackedChartData1 = chartData.level_states;
        this.stackedChartData2 = chartData.story_states;
      });
    }
  }
}
