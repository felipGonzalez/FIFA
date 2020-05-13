import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamModel } from 'src/app/model/TeamModel';
import { CreateTeamService } from './create-team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  public  team: TeamModel;
  public isValid: boolean;
  public message: string;
  public update: boolean
  constructor(private router:Router, private _Service: CreateTeamService ) {

    if (sessionStorage.getItem('team')) {
      this.team = JSON.parse(sessionStorage.getItem( 'team'));
      let date = new Date(this.team.fundacion)
      this.team.fundacion = date
      this.update = true
    } else {
      this.team = new TeamModel();
    }
  this.isValid = false;
  this.message = '';

   }

  ngOnInit(): void {
  }


  public navigateHome() {
    this.router.navigateByUrl('/home');
  }

  public saveTeam() {
    if(this._Service.validateData(this.team)){
      this._Service.saveData(this.team).subscribe(
        res => {
          sessionStorage.clear()
          this.router.navigateByUrl('/home');
        }, err =>{
          console.log(err);
          
          this.message = "Lo sentimos, hay un error de conexión"
          this.isValid = true
        }
      );
    }else {
      this.message = "El nombre, nacionalidad y fecha de fundación son obligatorios"
      this.isValid = true
    }
  }

  public updateTeam() {
    if(this._Service.validateData(this.team)){
      this._Service.updateData(this.team).subscribe(
        res => {
          sessionStorage.clear()
          this.router.navigateByUrl('/home');
        }, err =>{
          console.log(err);
          
          this.message = "Lo sentimos, hay un error de conexión"
          this.isValid = true
        }
      );
    }else {
      this.message = "El nombre, nacionalidad y fecha de fundación son obligatorios"
      this.isValid = true
    }
    
  } 
}
