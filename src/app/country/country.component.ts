import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GoogleChartInterface } from 'ng2-google-charts';
import { CovidDataService } from '../services/covid-data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  paramCountry:String;
  country:any = [];
  loaded:boolean = false;
  type = 'LineChart';

  data = [
    ['Firefox', 45.01],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7] 
  ];

  options = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
  };

  constructor(private service:CovidDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap 
      .subscribe((params: ParamMap) => {
        this.paramCountry = params.get('country');
      });
      this.getAllByCountry(this.paramCountry);
      
  }

  getAllByCountry(paramCountry) {
    this.service.getByCountry(paramCountry).subscribe((data: any[]) => {
      this.country = data
      console.log(this.country);
      //this.data = this.country;
      this.loaded = true;
    })
  }

  public lineChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [ ['Country', 'Performance'],
      [this.data]
    ],
    options: this.options,
  };

}
