import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Autenticable } from '../../administrador/servicios/compartido/Autenticable';
import { TipoArchivo } from '../modelos/TipoArchivo';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { FormatoArchivo } from '../modelos/FormatoArchivo';
import { PeticionCrearTipoArchivo } from '../modelos/PeticionCrearTipoArchivo';
import { TipoServicio } from '../modelos/TipoServicio';
import { saveAs } from 'file-saver';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarArchivosService extends Autenticable {
  private readonly HOST: string
  constructor(private clienteHttp: HttpClient) {
    super()
    this.HOST = environment.urlBackend
  }

  obtenerFormatosArchivo(pagina: number, limite: number){
    const endpoint = `/api/v1/formato_archivo/listar/${pagina}/${limite}`
    return this.clienteHttp.get<{formatosArchivos: FormatoArchivo[], paginacion: Paginacion}>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  cambiarEstadoTipoArchivo(id: string){
    const endpoint = `/api/v1/archivo/estado/${id}`
    return this.clienteHttp.post(
      `${this.HOST}${endpoint}`,
      undefined,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  crearTipoArchivo(peticion: PeticionCrearTipoArchivo){
    const endpoint = '/api/v1/archivo/registro'
    const formData = new FormData()
    formData.append('nombre', peticion.nombre)
    formData.append('prefijo', peticion.prefijo)
    formData.append('prefijoParametrizacion', peticion.prefijoParametrizacion)
    formData.append('formatoId', peticion.formatoId)
    formData.append('descripcion', peticion.descripcion)
    formData.append('tipo', peticion.tipoServicio.toString())
    return this.clienteHttp.post(
      `${this.HOST}${endpoint}`,
      formData,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  actualizarTipoArchivo(id:string, peticion: PeticionCrearTipoArchivo){
    const endpoint = `/api/v1/archivo/${id}`
    const formData = new FormData()
    formData.append('nombre', peticion.nombre)
    formData.append('prefijo', peticion.prefijo)
    formData.append('prefijoParametrizacion', peticion.prefijoParametrizacion)
    formData.append('formatoId', peticion.formatoId)
    formData.append('descripcion', peticion.descripcion)
    formData.append('tipo', peticion.tipoServicio.toString())
    return this.clienteHttp.patch(
      `${this.HOST}${endpoint}`,
      formData,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  obtenerTiposServicios(){
    const endpoint = '/api/v1/maestra/tipo-servicio'
    return this.clienteHttp.get<TipoServicio[]>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  obtenerTiposArchivo(){
    const endpoint = '/api/v1/archivo/listar'
    return this.clienteHttp.get<{archivos: TipoArchivo[]}>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  obtenerTiposArchivoPorEmpresa(idEmpresa: string){
    const endpoint = `/api/v1/archivo/empresa/${idEmpresa}`;
    return this.clienteHttp.get<{archivos: TipoArchivo[]}>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  obtenerTiposArchivoPaginado(pagina: number, limite: number){
    const endpoint = `/api/v1/archivo/listar/${pagina}/${limite}`
    return this.clienteHttp.get<{archivos: TipoArchivo[], paginacion: Paginacion}>(
      `${this.HOST}${endpoint}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } } 
    )
  }

  cargarArchivo(
    archivo: File, 
    corte: { fechaInicial: string, fechaFinal: string }, 
    tipoArchivo: string, 
    anio: string, 
    mes: string,
    esPrueba: boolean = false
  ) {
    const endpoint = '/api/v1/cargas'
    const formData = new FormData()
    formData.append('archivo', archivo)
    formData.append('fechaInicial', corte.fechaInicial)
    formData.append('fechaFinal', corte.fechaFinal)
    formData.append('tipoArchivo', tipoArchivo)
    formData.append('anio', anio)
    formData.append('mes', mes)
    formData.append('automatico',  esPrueba ? "N" : "S" ) //S para envio normal, N para envio de validación
    return this.clienteHttp.post(
      `${this.HOST}${endpoint}`, 
      formData,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
  }

  descargarManual(manual: string){
    this.clienteHttp.get<{archivoDescargar: string}>(
      `${this.HOST}/api/v1/archivo_empresa/manual/${manual}`,
      { headers: { Authorization: `Bearer ${this.obtenerTokenAutorizacion()}` } }
    )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al descargar el archivo:', error);
        return throwError('Error al descargar el archivo.');
      })
    )
    .subscribe((respuesta) => {
      const blob = this.b64toBlob(respuesta.archivoDescargar)
      saveAs(blob, manual);
    });
  }

  //stack overflow :D
  private b64toBlob(b64Data: string, contentType='', sliceSize = 512): Blob{
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}
