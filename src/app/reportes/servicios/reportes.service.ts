import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { environment } from 'src/environments/environment';
import { FiltrosColocacion } from '../modelos/Filtros/FiltrosColocacion';
import { ReporteColocacion } from '../modelos/ReporteColocacion';

@Injectable({
  providedIn: 'root'
})
export class ServicioReportes extends Autenticable{

  private readonly host = environment.urlBackend

  constructor(private http: HttpClient) { 
    super()
  }

  obtenerColocacion(filtros: FiltrosColocacion){
    const endpoint = '/api/v1/reportes/colocacion'
    return this.http.post<ReporteColocacion>(`${this.host}${endpoint}`, filtros, { headers: this.obtenerCabeceraAutorizacion() })
  }
}
