import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpacePipe } from '../pipes/space.pipe';
import { CovidDataService } from '../services/covid-data.service';
import { tap, pluck, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Country } from '../interface/country';
import { Summary } from '../interface/summary';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  providers: [ SpacePipe ],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public route: string;
  global: { [key:string]:string};
  countries: Summary[] = [];


  constructor(private covidService:CovidDataService) { }

  settings = {
    actions: false,
    pager: {  
      display: true,  
      perPage: 15  
    }, 
    attr: {  
      class: 'table table-bordered table-hover'  
    },  
    defaultStyle: false,  
    columns: {
      Country: { 
                  title: 'Country', 
                  filter: false,
                  type: 'html',
                  valuePrepareFunction: (country) => {
                    return  '<a (click)=onClick($event) href="https://galazzaroni.github.io/covid19-dashboard/country/'+country+'">'+ country+ '</a>'; 
                  }
                },
      //CountryCode: { title: 'Code' },
      ​​Date: { 
              title: 'Date', 
              filter: false, 
              valuePrepareFunction: (Date:any) => {
                return new DatePipe('en-US').transform(Date, 'yyyy-M-d')
            }
      },
      NewConfirmed: { title: 'New Confirmed', filter: false },
      NewDeaths: { title: 'New Deaths', filter: false },
      NewRecovered: { title: 'New Recovered', filter: false },
      //Slug: {title: 'Slug'},
      TotalConfirmed: {title: 'Total Confirmed', filter: false },
      TotalDeaths: {title: 'Total Deaths', filter: false },
      TotalRecovered: {title: 'Total Recovered', filter: false }
    }
  };

  ngOnInit(): void { 
    this.getAll();
  }

  getAll() {
    this.covidService.getSummary().subscribe((data: any[]) => {
      this.global = data['Global'];
      //console.log(this.global);
    })
    this.covidService.getSummary().subscribe((data:Summary[]) => {
      this.countries = data['Countries'];
      //console.log(this.countries);
    })
  }

  onClick(event :Event){
    event.preventDefault();
  }
}
