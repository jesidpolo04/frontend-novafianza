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
import { Producto } from '../modelos/Producto';

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

  obtenerProductos(empresa: string){
    const endpoint = '/api/v1/reportes/productos'
    return this.http.post<Producto[]>(`${this.host}${endpoint}`, {empresa}, { headers: this.obtenerCabeceraAutorizacion() })
  }

  exportarOperaciones(filtros: FiltrosOperaciones){
    let endpoint = `/api/v1/reportes/exportOperacion?empresa=${filtros.empresa}`
    if(filtros.anioColocacion){
      endpoint+= `&anioColocacion=${filtros.anioColocacion}`
    }
    if(filtros.mesColocacion){
      endpoint+= `&mesColocacion=${filtros.mesColocacion}`
    }
    if(filtros.fechaInicioDesembolso){
      endpoint+= `&fechaInicioDesembolso=${filtros.fechaInicioDesembolso}`
    }
    if(filtros.fechaFinalDesembolso){
      endpoint+= `&fechaFinalDesembolso=${filtros.fechaFinalDesembolso}`
    }
    const a = document.createElement('a')
    a.setAttribute('target', '_blank')
    a.setAttribute('href', `${this.host}${endpoint}`)
    a.click()
  }

  exportarSaldosCartera(filtros: FiltrosSaldosCartera){
    let endpoint = `/api/v1/reportes/exportSaldosCartera?anioColocacion=${filtros.anioColocacion}&mesColocacion=${filtros.mesColocacion}&empresa=${filtros.empresa}`
    if(filtros.genero){
      endpoint+= `&genero=${filtros.genero}`
    }
    if(filtros.departamento){
      endpoint+= `&departamento=${filtros.departamento}`
    }
    if(filtros.alturaDeMora){
      endpoint+= `&alturaDeMora=${filtros.alturaDeMora}`
    }
    const a = document.createElement('a')
    a.setAttribute('target', '_blank')
    a.setAttribute('href', `${this.host}${endpoint}`)
    a.click()
  }

  exportarColocacion(filtros: FiltrosColocacion){
    let endpoint = `/api/v1/reportes/exportColocacion?fechaInicioCorte=${filtros.fechaInicioCorte}&fechaFinalCorte=${filtros.fechaFinalCorte}&empresa=${filtros.empresa}&producto=${filtros.producto}`
    const a = document.createElement('a')
    a.setAttribute('target', '_blank')
    a.setAttribute('href', `${this.host}${endpoint}`)
    a.click()
  }
}
