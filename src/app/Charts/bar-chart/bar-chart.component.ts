import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  
  @ViewChild('barChart') barChart!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPackets();
  }

  getPackets() {
    this.apiService.getPackets().subscribe((data) => {
      this.createBarChart(data);
    });
  }

  createBarChart(data: any[]) {
    const protocols = data.map(item => item.protocol);
    const protocolCounts = this.countOccurrences(protocols);

    const chartData = {
      labels: Object.keys(protocolCounts),
      datasets: [
        {
          label: 'Protocol',
          data: Object.values(protocolCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }
      ]
    };

    const barChart = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  countOccurrences(arr: any[]) {
    return arr.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  }
}