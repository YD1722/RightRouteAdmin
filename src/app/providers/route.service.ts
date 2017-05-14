import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import {AuthenticationService} from '../providers/authentication.service';
import {Route} from '../dataModels/Routes';

@Injectable()
export class RouteService {

  testUrl='http://localhost:8080/api/routeList';
  constructor(private http: Http,private authService:AuthenticationService) { }

  getTest(searchStr:string):Observable<any[]>{  // make this route type :D
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.testUrl,{name:searchStr},options)  // why JSON.stringify() not used here ?
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addRouteUrl='http://localhost:8080/api/route';
 
  addRoute(route:Route):Observable<any[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authService.token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addRouteUrl,JSON.stringify(route),options)
      .map((res:Response)=>res.json())
      .catch(this.handleError);
  }

  updateRoute(id:any,route:Route):Observable<any[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authService.token);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`http://localhost:8080/api/route/${id}`,JSON.stringify(route),options)
           .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
           .catch(this.handleError);
  }

  // check for observables rather than promise

  deleteRoute(id:any):Observable<Route[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authService.token);
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:8080/api/route/${id}`,options)
      .map((res:Response)=>res.json())
      .catch(this.handleError);
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
