import { Component,OnInit } from '@angular/core';
import {AuthenticationService} from './providers/authentication.service';
import { Router } from '@angular/router';
import {StationService} from './providers/station.service';
import {Station} from './dataModels/Station'
import {Subject} from 'rxjs/Subject';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  name = 'RR ADMIN ';


  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor(private authSevrice:AuthenticationService,private router:Router){
  }

  ngOnInit(){
    this._success.subscribe((message) => this.successMessage = message);
    this._success.debounceTime(1500).subscribe(() =>{
      this.successMessage = null;

    });
  }

  // need more attention regarding routing
  logout(){
    this.authSevrice.checkAuthentication().then(res=>{
      this.authSevrice.logout();
      this.router.navigate(['/dashboard']);
      this._success.next(`Successfully logged out`);
    },(err)=>{
      this._success.next(`already logged out`);
    });
    
    
    

  }
}
