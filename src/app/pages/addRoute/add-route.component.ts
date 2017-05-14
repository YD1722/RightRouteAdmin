import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
//import {Ng2DragDropModule} from "ng2-drag-drop";
import {Subject} from 'rxjs/Subject';
import {Station} from '../../dataModels/Station';
import {StationService} from '../../providers/station.service';
import {Observable} from 'rxjs/Rx';
import {RouteService} from '../../providers/route.service';
import {Route} from '../../dataModels/Routes';
import {isCombinedNodeFlagSet} from "tslint";
import {logging} from "selenium-webdriver";
import{AuthenticationService} from '../../providers/authentication.service';

export class Widget {
  constructor(public name: string) {}
}

@Component({
  selector: 'add-route',
  templateUrl:'./add-route.component.html',
  styleUrls:['./add-route.component.css']
})

export class AddRouteComponent implements OnInit{
  listOne: Array<Station> =[];
  receivedData: Array<any> = [];

  protected searchStr:string;
  protected searchRouteStr:string;

  successMessage: string;
  stations: any[];
  routes:any[];
  filteredList: Station[];
  droppedItems:any[]=[];
  private _success = new Subject<string>();

   newRoute:Route={
     name:null,
     start:null,
     end:null,
     path:null,
     kml_path:null,
     reviews:null,
  }; // its not define initially :D

  constructor(private stationService: StationService, private elementRef: ElementRef,
    private routeService:RouteService,private authService:AuthenticationService) {
  }

  onItemDrop(e: any) {
    this.droppedItems.push(e.dragData);
    console.log(this.droppedItems);
  }


  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.debounceTime(1500).subscribe(() =>{
      this.successMessage = null;
    });
    //this.loadStations();
    // this.dataService=this.completerService.local(this.stations,'station_name','station_name');
  }

  onKey(event: any) { // without type info
    //console.log(this.listOne);
    if(!(this.searchStr.trim()=="")) {
      this.stationService.getTest(this.searchStr).subscribe(
        stations => this.stations = stations
      )
    }else{
      this.stations=[];
    }
  }

  onKeyRoute(event:any){
    if(!(this.searchRouteStr.trim()=="")) {
      this.routeService.getTest(this.searchRouteStr).subscribe(
        routes => this.routes = routes
      );
    }else{
      this.routes=[];
    }
  }

/*  filter() {
    if (this.searchStr !== ""){
      this.filteredList = this.stations.filter((el:any)=>{
        return el.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }*/

  select(item: string) {
    this.searchStr = item;
    this.filteredList = [];
  }
  loadStations() {
  this.stationService.getStations().subscribe(stations => this.stations = stations);
    // /*this.stationService.getStations().subscribe(
    //   stations => this.stations = stations
    // );*/
   /* this.stations=[
      { station_name: 'red', coordinates:[1,2] },
      { station_name: 'green', coordinates:[1,2] },
      { station_name: 'blue', coordinates:[1,2] }

    ];*/
  }

  transferDataSuccess($event: any) {
    //console.log($event.dragData);
    this.receivedData.push($event.dragData);
    this.listOne.push($event.dragData);

  }



  // update existing routes
  selectedRoute:any;


  onSelect(route:any){
    this.listOne=[];
    let stationObjects:any=[];
    this.selectedRoute=route;
    let path= route.path;
    for(let station of path){
      //console.log(station);
      this.stationService.getStation(station).subscribe(station=>stationObjects.push(station[0]));
    }

    this.listOne=stationObjects;

    this.newRoute.path=stationObjects;
    this.newRoute.kml_path=route.kml_path;
    this.newRoute.name= route.name;
    this.newRoute.start=route.start;
    this.newRoute.end=route.end;
    this.newRoute.reviews=route.reviews;
    //console.log(this.listOne);
  }

  reset(){
    this.selectedRoute=null;
    this.listOne=[];
    // should have a another mrthod of doing this
    this.newRoute.kml_path=null;
    this.newRoute.name=null;
    this.newRoute.path=null;
    this.newRoute.reviews=[];
  }

  updateRoute(){
    console.log(this.newRoute);
    let tempPath= this.newRoute.path;
    let newPath:any=[];
    for(let station of tempPath){
      newPath.push(station.station_name);
    }
    this.newRoute.path=newPath;
    this.authService.checkAuthentication().then(res=>{
      this.routeService.updateRoute(this.selectedRoute._id,this.newRoute).subscribe(()=>{
      this._success.next('Successfully update the route' + this.selectedRoute.name);
      });
    },(err)=>{
      this._success.next(`operation restricted!`);  
    })
    
  }


  delete(){
    this.authService.checkAuthentication().then(res=>{
      this.routeService.deleteRoute(this.selectedRoute._id).subscribe(()=> {
      this._success.next('Successfully delete a route');
      });
    },(err)=>{
      this._success.next(`operation restricted!`);
    })
    
  }

  addNewRoute(){
    this.newRoute.path=[];
    if(this.listOne.length==0){
      console.log('set the route first');
    }
    for(let station of this.listOne){
      this.newRoute.path.push(station.station_name);
    }

    //console.log(this.newRoute);
    this.authService.checkAuthentication().then(res=>{
      this.routeService.addRoute(this.newRoute).subscribe((res:any)=> {
      this._success.next(res.message);
    },(err)=>{
      this._success.next(`operation restricted!`);
    })
    
      
    });


}

clear(){
  this.searchStr=null;
}

clearRoute(){
  this.searchRouteStr=null;
}

// testin purpose


}
