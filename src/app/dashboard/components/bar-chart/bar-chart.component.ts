import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})

export class ChartBarComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title: string = "Puntaje";
  @Input() color: string = "#42A5F5";

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
      datasets: [
        {
          label: this.title,
          backgroundColor: this.color,
          borderColor: '#1E88E5',
          data: this.data
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }
}