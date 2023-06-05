import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
 
})
export class PagesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ip_src', 'ip_dst', 'mac_src', 'mac_dst', 'protocol' , 'sport', 'dport' ];
  dataSource!: MatTableDataSource<any>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private apiService:ApiService) {  }

  ngOnInit(): void {
    this.getPackets();  
  }


  
  getPackets() {
    this.apiService.getPackets().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  
}


  // ngOnInit(): void {
  //   // this.fetchData();
  //   this.apiService.getPackets().subscribe((data) => {
  //     this.dataSource = new MatTableDataSource(data)
  //     this.dataSource.paginator=this.paginator;
  //     this.dataSource.sort = this.sort;

  //     });

  
  
  // this.endpoints = this.apiService.getEndpoints().subscribe(
  //   data => this.endpoints = data
  //   )

  