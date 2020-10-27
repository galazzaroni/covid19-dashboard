import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CovidDataService } from '../services/covid-data.service';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountryComponent implements OnInit {
  paramCountry:String;
  country:any = [];
  loaded:boolean = false;
  pipe = new DatePipe('en-US');
  /*newCountry:any = [];

  isSetted = false;
  months:any = [];
  january:any = [];
  febraury:any = [];
  march:any = [];
  april:any = [];
  may:any = [];
  june:any = [];
  july:any = [];
  august:any = [];
  september: any = [];
  october: any = [];
  november: any = [];
  december: any = [];*/


  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];

  /** Chart Options */
  public chartOptions = {
    responsive: true,
  };
  

  constructor(private service:CovidDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap 
      .subscribe((params: ParamMap) => {
        this.paramCountry = params.get('country');
      });
      this.getAllByCountry(this.paramCountry);
      /*this.getJanuary(this.paramCountry);
      this.getFebraury(this.paramCountry);
      this.getMarch(this.paramCountry);
      this.getApril(this.paramCountry);
      this.getMay(this.paramCountry);
      this.getJune(this.paramCountry);
      this.getJuly(this.paramCountry);
      this.getAugust(this.paramCountry);
      this.getSeptember(this.paramCountry);
      this.getOctober(this.paramCountry);*/
      //console.log(this.months);
  }

  /*getJanuary(paramCountry) {
    this.service.getByCountryJanuary(paramCountry).subscribe((data: any[]) => {
      this.january = data;
      this.january.month = 'January';
      this.months = this.months.concat(this.january);
      //console.log(this.january);
    })
  }
  
  getFebraury(paramCountry) {
    this.service.getByCountryFebraury(paramCountry).subscribe((data: any[]) => {
      this.febraury = data;
      //console.log(this.febraury);
      this.months = this.months.concat(this.febraury);
    })
  }

  getMarch(paramCountry) {
    this.service.getByCountryMarch(paramCountry).subscribe((data: any[]) => {
      this.march = data;
      //console.log(this.march);
      this.months = this.months.concat(this.march);
    })
  }

  getApril(paramCountry) {
    this.service.getByCountryApril(paramCountry).subscribe((data: any[]) => {
      this.april = data;
      this.months = this.months.concat(this.april);
    })
  }
  
  getMay(paramCountry) {
    this.service.getByCountryMay(paramCountry).subscribe((data: any[]) => {
      this.may = data;
      console.log(this.may);
    })
  }

  getJune(paramCountry) {
    this.service.getByCountryJune(paramCountry).subscribe((data: any[]) => {
      this.june = data;
      //console.log(this.june);
    })
  }

  getJuly(paramCountry) {
    this.service.getByCountryJuly(paramCountry).subscribe((data: any[]) => {
      this.july = data;
      //console.log(this.july);
    })
  }

  getAugust(paramCountry) {
    this.service.getByCountryAugust(paramCountry).subscribe((data: any[]) => {
      this.august = data;
      //console.log(this.august);
    })
  }

  getSeptember(paramCountry) {
    this.service.getByCountrySeptember(paramCountry).subscribe((data: any[]) => {
      this.september = data;
      //console.log(this.september);
    })
  }

  getOctober(paramCountry) {
    this.service.getByCountryOctober(paramCountry).subscribe((data: any[]) => {
      this.october = data;
      //console.log(this.october);
    })
  }*/

  getAllByCountry(paramCountry) {
    this.service.getByCountry(paramCountry).subscribe((data: any[]) => {
      this.country = data;

      let dataChart = this.country;
      //console.log(dataChart);
      this.setDataChart(dataChart);
    });
    
      //this.setDataChart(this.country);
  }

  setDataChart(data) {
    this.lineChartLabels = data.map(a => a.Month);
    this.lineChartData = [
      { data: data.map(a => a.Active), label: 'Actives' },
      { data: data.map(d => d.Deaths), label: 'Deaths' },
      { data: data.map(c => c.Confirmed), label: 'Confirmed' },
      { data: data.map(c => c.Recovered), label: 'Recovered' }
    ];
    this.loaded = true;
  }

  /*totalDeaths(data) {
    let oJan = {} as Country;
    //return data.map(t => t.Deaths as number).reduce((a, b) => a + b, 0);
    let jan = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-01-31');
    oJan.Confirmed = jan.map(t => t.Confirmed);
    oJan.Deaths = jan.map(t => t.Deaths);
    oJan.Recovered = jan.map(t => t.Recovered);
    oJan.Active = jan.map(t => t.Active);
    oJan.Month = 'January';
    this.newCountry.push(oJan);

    let oFeb = {} as Country;
    let feb = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-02-29');
    oFeb.Confirmed = feb.map(t => t.Confirmed);
    oFeb.Deaths = feb.map(t => t.Deaths);
    oFeb.Recovered = feb.map(t => t.Recovered);
    oFeb.Active = feb.map(t => t.Active);
    oFeb.Month = 'Febraury';
    this.newCountry.push(oFeb);

    let oMar = {} as Country;
    let mar = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-03-31');
    oMar.Confirmed = mar.map(t => t.Confirmed as number).reduce((a, b) => a + b, 0);
    oMar.Deaths = mar.map(t => t.Deaths as number).reduce((a, b) => a + b, 0);
    oMar.Recovered = mar.map(t => t.Recovered as number).reduce((a, b) => a + b, 0);
    oMar.Active = mar.map(t => t.Active as number).reduce((a, b) => a + b, 0);
    oMar.Confirmed = mar.map(t => t.Confirmed as number);
    oMar.Deaths = mar.map(t => t.Deaths as number);
    oMar.Recovered = mar.map(t => t.Recovered as number);
    oMar.Active = mar.map(t => t.Active as number);;
    oMar.Month = 'March';
    this.newCountry.push(oMar);

    let oApr = {} as Country;
    let apr = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-04-30');
    oApr.Confirmed = apr.map( t => t.Confirmed )
    oApr.Deaths = apr.map( t => t.Deaths )
    oApr.Recovered = apr.map( t => t.Recovered )
    oApr.Active = apr.map( t => t.Active )
    oApr.Month = 'April';
    this.newCountry.push(oApr);

    let oMay = {} as Country;
    let may = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-05-31');
    oMay.Confirmed = may.map(t => t.Confirmed);
    oMay.Deaths = may.map(t => t.Deaths);
    oMay.Recovered = may.map(t => t.Recovered);
    oMay.Active = may.map(t => t.Active);
    oMay.Month = 'May';
    this.newCountry.push(oMay);

    let oJun = {} as Country;
    let jun = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-06-30');
    oJun.Confirmed = jun.map(t => t.Confirmed);
    oJun.Deaths = jun.map(t => t.Deaths);
    oJun.Recovered = jun.map(t => t.Recovered);
    oJun.Active = jun.map(t => t.Active);
    oJun.Month = 'June';
    this.newCountry.push(oJun);

    let oJul = {} as Country;
    let jul = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-07-31');
    oJul.Confirmed = jul.map(t => t.Confirmed);
    oJul.Deaths = jul.map(t => t.Deaths);
    oJul.Recovered = jul.map(t => t.Recovered);
    oJul.Active = jul.map(t => t.Active);
    oJul.Month = 'July';
    this.newCountry.push(oJul);

    let oAug = {} as Country;
    let aug = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-08-31');
    oAug.Confirmed = aug.map(t => t.Confirmed);
    oAug.Deaths = aug.map(t => t.Deaths);
    oAug.Recovered = aug.map(t => t.Recovered);
    oAug.Active = aug.map(t => t.Active);
    oAug.Month = 'August';
    this.newCountry.push(oAug);

    let oSep = {} as Country;
    let sep = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-09-30');
    oSep.Confirmed = sep.map(t => t.Confirmed);
    oSep.Deaths = sep.map(t => t.Deaths);
    oSep.Recovered = sep.map(t => t.Recovered);
    oSep.Active = sep.map(t => t.Active);
    oSep.Month = 'September';
    this.newCountry.push(oSep);

    let oOct = {} as Country;
    let oct = data.filter(t => this.pipe.transform(t.Date, 'yyyy-MM-d') == '2020-10-26');
    oOct.Confirmed = oct.map(t => t.Confirmed);
    oOct.Deaths = oct.map(t => t.Deaths);
    oOct.Recovered = oct.map(t => t.Recovered);
    oOct.Active = oct.map(t => t.Active);
    oOct.Month = 'October';
    this.newCountry.push(oOct);

    return this.newCountry;
  }*/

}

export interface Country{
  Confirmed: number,
  Deaths: number, 
  Recovered: number,
  Active: number,
  Month: String
}