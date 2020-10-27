import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import { SpacePipe } from '../pipes/space.pipe';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CovidDataService } from '../services/covid-data.service';
import { ChartDataSets, ChartOptions, ChartColor } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { Country } from '../interface/country';
import { Summary } from '../interface/summary';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  //providers: [ SpacePipe ],
  encapsulation: ViewEncapsulation.None
})
export class CountryComponent implements OnInit {
  paramCountry:String;
  country:Country[] = [];
  loaded:boolean = false;
  summary:boolean = false;
  pipe = new DatePipe('en-US');
  summaryCountry: { [key:string]:string};

  /** Chart Options */
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public chartOptions: ChartOptions = {
    responsive: true,
    animation: {duration: 4000},
    scales: {
      xAxes: [{
        type: 'time',
        time: {
            unit: 'month'
        },
      }],
    }
  };

  constructor(private service:CovidDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap 
      .subscribe((params: ParamMap) => {
        this.paramCountry = params.get('country');
      });
      this.getAllByCountry(this.paramCountry);
      this.getSummaryByCountry(this.paramCountry);
  }


  getAllByCountry(paramCountry) {
    this.service.getByCountry(paramCountry).subscribe((data: Country[]) => {
      this.country = data;

      let dataChart = this.country;
      //console.log(dataChart);
      this.setDataChart(dataChart);
    });
  }

  getSummaryByCountry(paramCountry){
    this.service.getSummary().subscribe((data:any[]) => {
      this.summaryCountry = data['Countries'].filter(s => s.Country === paramCountry);
      this.summary = true;
      //console.log(this.summaryCountry);
    });
  }

  setDataChart(data) {
    this.lineChartLabels = data.map(a => this.pipe.transform(a.Date, 'yyyy-MM-dd'));
    this.lineChartData = [
      { data: data.map(a => a.Active), label: 'Actives' },
      { data: data.map(d => d.Deaths), label: 'Deaths' },
      { data: data.map(c => c.Confirmed), label: 'Confirmed' },
      { data: data.map(c => c.Recovered), label: 'Recovered' }
    ];
    this.loaded = true;
  }

}

