import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import {RouterModule,Routes} from '@angular/router';
import {DndModule} from 'ng2-dnd';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {StationService} from  './providers/station.service';
import {AuthenticationService} from './providers/authentication.service';
import {RouteService} from './providers/route.service';

import{StationDetailComponent} from './pages/station-detail/station-detail.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {StationsComponent} from './pages/stations/stations.component';
import {AddStationComponent} from './pages/addStation/add-station.component';
import {AddRouteComponent} from './pages/addRoute/add-route.component';
import{LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'stations', component: StationsComponent },
  {path:'addStation',component:AddStationComponent},
  {path:'addRoute',component:AddRouteComponent},
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule,
                  RouterModule.forRoot(routes),DndModule.forRoot(),NgbModule.forRoot()],
  declarations: [ AppComponent,DashboardComponent,StationsComponent,AddStationComponent,AddRouteComponent,LoginComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [StationService,AuthenticationService,RouteService],
  exports:      [RouterModule]
})
export class AppModule { }
