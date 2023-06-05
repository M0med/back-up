import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  // packets:any;
  endpoints:any;

  constructor (private apiService: ApiService) { }


  ngOnInit(): void {
    // this.fetchData();
    this.apiService.getEndpoints().subscribe((data) => {
      this.endpoints = data;
      });

  }


  // fetchData() {
  //   this.apiService.getPackets().subscribe((data) => {
  //     this.packets = data;
  //   });

  //   this.apiService.getEndpoints().subscribe((data) => {
  //     this.endpoints = data;
  //   });
  // }
}
