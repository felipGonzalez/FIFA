import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamModel } from 'src/app/model/TeamModel';

@Injectable({
  providedIn: 'root'
})
export class CreateTeamService {

  _Url = "https://services-prod.worldoffice.cloud/"

  constructor(private http:HttpClient) { }

  saveData(team:TeamModel):Observable<TeamModel> {
    return this.http.post<TeamModel>(this._Url+"/equipos/crear",team)
  }

  updateData(team:TeamModel):Observable<TeamModel> {
    return this.http.put<TeamModel>(this._Url+"equipos/actualizar/"+team.id,team)
  }

  validateData(team:TeamModel):boolean {
    console.log(team.nombre);
    
    if(team.nombre === undefined || team.nombre === "" ) return false
    if(team.nacionalidad === undefined || team.nacionalidad === "") return false
    if(team.entrenador === undefined || team.entrenador === "") return false
    return true
  }
  
}
