import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  loginUrl='http://localhost:8080/api/login';
  public token:any;
  constructor(private http: Http) { }

  checkAuthentication(){
    return new Promise((resolve,reject)=>{

        this.token=localStorage.getItem('token');

        console.log('initToken',this.token);

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get('http://localhost:8080/api/auth/protected',{headers:headers})
          .subscribe(res=>{
            resolve(res);
          },err=>{
            reject(err);
          });
      });

  }

  login(credentials:any){
    return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post('http://localhost:8080/api/auth/login',JSON.stringify(credentials),{headers:headers})
        .subscribe(res=>{
          let data = res.json();
          this.token = data.token; // have a local variable call token :D
          localStorage.setItem('token', data.token);
          resolve(data);
          //resolve(res.json()); // ????
        },(err)=>{
          reject(err);
        });
    });
  }

  logout(){
    localStorage.setItem('token', '');

  }
}
