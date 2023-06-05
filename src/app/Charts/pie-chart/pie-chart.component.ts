import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @ViewChild('pieChart') pieChart!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPackets();
  }

  getPackets() {
    this.apiService.getPackets().subscribe((data) => {
      // Create pie chart with packet protocols
      this.createPieChart(data);
    });
  }

  createPieChart(data: any[]) {
    const protocols = data.map(item => item.protocol);
    const protocolCounts = this.countOccurrences(protocols);

    const chartData = {
      labels: Object.keys(protocolCounts),
      datasets: [
        {
          label: 'Protocol',
          data: Object.values(protocolCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          borderWidth: 1
        }
      ]
    };

    const pieChart = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true
        
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