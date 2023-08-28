import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { environment } from 'src/environments/environment';
import { FiltrosColocacion } from '../modelos/Filtros/FiltrosColocacion';
import { ReporteColocacion } from '../modelos/ReporteColocacion';
import { FiltrosOperaciones } from '../modelos/Filtros/FiltrosOperaciones';
import { Operaciones } from '../modelos/Operaciones';
import { ReporteSaldosCartera } from '../modelos/ReporteSaldosCartera';
import { FiltrosSaldosCartera } from '../modelos/Filtros/FiltrosSaldosCartera';

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

  obtenerOperaciones(filtros: FiltrosOperaciones){
    const endpoint = '/api/v1/reportes/operaciones'
    return this.http.post<Operaciones>(`${this.host}${endpoint}`, filtros, { headers: this.obtenerCabeceraAutorizacion() })
  }

  obtenerSaldosCartera(filtros: FiltrosSaldosCartera){
    const endpoint = '/api/v1/reportes/saldosCartera'
    return this.http.post<ReporteSaldosCartera>(`${this.host}${endpoint}`, filtros, { headers: this.obtenerCabeceraAutorizacion() })
  }
}
