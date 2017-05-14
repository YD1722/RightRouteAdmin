import {Component, OnInit} from '@angular/core';
import{AuthenticationService} from '../../providers/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl:'./login.component.html'
})
export class LoginComponent implements OnInit{
  model: any = {}; //model save user crentials :D
  loading = false;
  error = '';

constructor(private authService:AuthenticationService,private router:Router){}

ngOnInit(){
  this.loading=true;
  this.authService.checkAuthentication().then(res=>{
    console.log("Already authorized");
    this.loading=false;
    this.router.navigate(['/dashboard']); // is route correcct??
  }, (err) => {
    console.log("Not already authorized");
    this.loading=false;
  });
}
  login(){

    this.loading=true;

    let credentials = {
      username: this.model.username,
      password: this.model.password
    };

    console.log(credentials);

    this.authService.login(credentials).then((result) => {
      this.loading=false;
      console.log(result);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      this.loading=false;
      console.log(err);
    });

  }

}
