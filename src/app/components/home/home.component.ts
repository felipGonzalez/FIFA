import { Component, OnInit } from '@angular/core';
import {HomeService } from './home.service';
import { TeamModel } from 'src/app/model/TeamModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listTeam : Array<TeamModel>
  flagList: boolean;
  dateInit: Date;
  dateEnd: Date;
  id: number
  message: string
  result:boolean

  constructor(private _service:HomeService, private router: Router) {
    this.listTeam = new Array<TeamModel>()
   }

  ngOnInit(): void {
    this.loadListTeam()
  }

  loadListTeam() {
    this._service.getTeam().subscribe(
      res => {
        this.listTeam = res
        this.flagList = true
      },
      err => {
        console.log(err.error);
        
      }
    );
  }

  public createNewTeam() {
    sessionStorage.clear()
    this.router.navigateByUrl('/gestion');
  }

  public edit(team: TeamModel): void {
    sessionStorage.setItem('team', JSON.stringify(team));
    this.router.navigate(['/gestion']);
  }

  public delete(id:number){
    this._service.deleteTeam(id).subscribe(
      res => {
        this.loadListTeam()
      },
      err => {
        console.log(err);
      }
    );
  }

  search():void{
    if(this.dateEnd !== undefined && this.dateInit !== undefined){
     
      this._service.searchByDate(this.dateInit,this.dateEnd).subscribe(
        res => {
          console.log(res);
          if(res.length !== 0){
            this.result = false
            this.listTeam = res
          }else {
            this.message = "No se encontraron datos"
            this.result = true
          }
        }, 
        err => {
          console.log(err);
          this.message = "No se encontraron datos"
          this.result = true
        }
      );


    }else if(this.id !== null && this.id !== 0 && this.id !== undefined){
      console.log();
      
     
      this._service.searchById(this.id).subscribe(
        res => {
          console.log(res);
          this.listTeam = new Array<TeamModel>()
          this.listTeam.push(res)
          this.result = false
        }, 
        err => {
          console.log(err);
          this.message = "No se encontraron datos"
          this.result = true
        }
      );
    }
    else {
      this.loadListTeam()
      this.result = false
    }

  }


}
