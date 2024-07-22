import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-stacked-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './stacked-chart.component.html',
  styleUrl: './stacked-chart.component.css'
})

export class StackedChartComponent implements OnChanges {
  @Input() data: { label: string, data: number[], backgroundColor: string }[] = [];
  @Input() labels: string[] = [];

  chartData: any;
  chartOptions: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['labels']) {
      this.updateChartData();
    }
  }

  updateChartData() {
    this.chartData = {
      labels: this.labels,
      datasets: this.data
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }
}