import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import {Station} from '../dataModels/Station'
import {AuthenticationService} from '../providers/authentication.service';

@Injectable()
export class StationService {

  stationUrl='http://localhost:8080/api/stations';
  testUrl='http://localhost:8080/api/stationtest';

  constructor(private http: Http,private authService:AuthenticationService) { }

  // Get all posts from the API
/*  getStations() {
    return this.http.get('http://localhost:8080/api/stations')
      .map(res => res.json());
  }*/

/*  getStations(): Promise<Station[]> {
    return this.http.get(this.stationUrl)
      .toPromise()
      .then(response => response.json() as Station[])
      .catch(this.handleError);
  }
  */

// another problem :(
  // get station by its name
  // return as a single element of arry ??
  getStation(station_name:any):Observable<Station[]>{
    return this.http.get(`http://localhost:8080/api/station/${station_name}`).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStations(): Observable<Station[]> {
    return this.http.get(this.stationUrl).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  // testing purporse
  getTest(searchStr:string):Observable<Station[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


      return this.http.post(this.testUrl, {var: searchStr}, options)  // why JSON.stringify() not used here ?
        .map((res: Response) => res.json())
        .catch(this.handleError);

  }

  addStation(station:Station):Observable<any[]>{
    let url="http://localhost:8080/api/station";

    let headers = new Headers();
    headers.append('Authorization',this.authService.token);
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url,
      {station_name:station.station_name,
      coordinates:station.coordinates},options       // no need JSON.stringify()?
      )
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }



  deleteStation(id:any):Observable<Station[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:8080/api/station/${id}`,options)
      .map((res:Response)=>res.json())
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
