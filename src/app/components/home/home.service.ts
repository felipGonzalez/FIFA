import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamModel } from 'src/app/model/TeamModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  _Url = "https://services-prod.worldoffice.cloud/"

  constructor(private http:HttpClient) { }

  getTeam():Observable<Array<TeamModel>> {
    return this.http.get<Array<TeamModel>>(this._Url+"equipos/listar");
  }

  deleteTeam(id:number): Observable <any>{
    return this.http.delete<any>(this._Url+"equipos/eliminar/"+id);
  }

  searchById(id:number):Observable<TeamModel>{
    return this.http.get<TeamModel>(this._Url+"equipos/consultar/"+id);
  }

  searchByDate(date1:Date, date2:Date):Observable<Array<TeamModel>>{
    let dateInit = this.formatDate(date1)
    let dateEnd = this.formatDate(date2) 
    return this.http.get<Array<TeamModel>>(this._Url+"equipos/consultar/"+dateInit+"/"+dateEnd);
  }

  formatDate(dateObj:Date){
    let month = dateObj.getMonth()+1;
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    let output = `${day}-${month}-${year}`;
    console.log(output);
    return output
  }
}
