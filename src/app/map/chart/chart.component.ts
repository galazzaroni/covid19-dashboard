import { Component, OnInit, Input } from '@angular/core';
import { GoogleChartService } from '../../services/google-chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() data:any[];
  @Input() options:any;
  @Input() elementId:string;
  @Input() type:string;

  constructor(private gchartService: GoogleChartService) { }

  ngOnInit(): void {
    switch(this.type){
      case 'geochart':
        this.gchartService.BuildGeoChart(this.elementId, this.data, this.options);
        break;
      case 'columnchart':
        this.gchartService.BuildColumnChart(this.elementId, this.data, this.options);
        break;
      default:
        console.log("nothing to plot");
    }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    // this.geochartService.BuildGeoChart(this.elementId, this.data, this.options);
    // console.log(changes)
  }

}
