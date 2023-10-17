import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticable } from 'src/app/administrador/servicios/compartido/Autenticable';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { environment } from 'src/environments/environment';
import { CorreoOperacion } from '../modelos/CorreoOperacion';
import { PeticionActualizarCorreoOperacion } from '../modelos/PeticionActualizarCorreoOperacion';
import { PeticionCrearCorreoOperacion } from '../modelos/PeticionCrearCorreoOperacion';

@Injectable({
  providedIn: 'root'
})
export class ServicioCorreosOperaciones extends Autenticable {
  private readonly HOST = environment.urlBackend;

  constructor(private clienteHttp: HttpClient) {
    super()
  }

  obtenerCorreos(): Observable<CorreoOperacion[]> {
    const endpoint = `/api/v1/correos`
    return this.clienteHttp.get<CorreoOperacion[]>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  crearCorreo(peticion: PeticionCrearCorreoOperacion){
    const endpoint = `/api/v1/correos`
    return this.clienteHttp.post(
        `${this.HOST}${endpoint}`, 
        peticion,
        { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  actualizarCorreo(idCorreo: number, peticion: PeticionActualizarCorreoOperacion){
    const endpoint = `/api/v1/correos/${idCorreo}`
    return this.clienteHttp.put(
        `${this.HOST}${endpoint}`, 
        peticion,
        { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  eliminarCorreo(idCorreo: number){
    const endpoint = `/api/v1/correos/${idCorreo}`
    return this.clienteHttp.delete(
      `${this.HOST}${endpoint}`, 
        { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

}
