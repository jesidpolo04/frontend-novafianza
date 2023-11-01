import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { ModalCrearArchivoComponent } from '../modal-crear-archivo/modal-crear-archivo.component';
import { ModalActualizarArchivoComponent } from '../modal-actualizar-archivo/modal-actualizar-archivo.component';
import { TipoArchivo } from '../../modelos/TipoArchivo';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { FormatoArchivo } from '../../modelos/FormatoArchivo';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { formatearFechaIso } from 'src/app/compartido/Fechas';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-pagina-gestion-archivos',
  templateUrl: './pagina-gestion-archivos.component.html',
  styleUrls: ['./pagina-gestion-archivos.component.css']
})
export class PaginaGestionArchivosComponent implements OnInit {
  @ViewChild('modalCrear') modalCrear!: ModalCrearArchivoComponent
  @ViewChild('modalActualizar') modalActualizar!: ModalActualizarArchivoComponent
  @ViewChild('popup') popup!: PopupComponent
  paginador: Paginador;
  formatosArchivo: FormatoArchivo[] = []
  archivos: TipoArchivo[] = []

  constructor(private servicioArchivos: CargarArchivosService, private servicioCabecera: ServicioCabeceraService) { 
    this.servicioCabecera.actualizarTitulo(['Administrar servicios', 'assets/img/cabecera/administrar-servicios-blanco.svg']) 
    this.paginador = new Paginador(this.obtenerTiposArchivo)
  }

  ngOnInit(): void {
    this.paginador.inicializarPaginacion()
  }

  obtenerFormatosArchivo(pagina: number, limite: number){
    this.servicioArchivos.obtenerFormatosArchivo(pagina, limite).subscribe({
      next: (respuesta)=>{
        this.formatosArchivo = respuesta.formatosArchivos
      }
    })
  }

  obtenerTiposArchivo = (pagina:number, limite: number) =>{
    return new Observable<Paginacion>( subscriptor => {
      this.servicioArchivos.obtenerTiposArchivoPaginado(pagina, limite).subscribe({
        next: ( respuesta ) => {
          this.archivos = respuesta.archivos
          subscriptor.next( respuesta.paginacion )
        } 
      })
    })
  }

  actualizarEstadoTipoArchivo(id: string){
    this.servicioArchivos.cambiarEstadoTipoArchivo(id).subscribe({
      next: ()=> { this.popup.abrirPopupExitoso('Se cambio el estado del servicio con éxito.') },
      error: ()=> { this.popup.abrirPopupExitoso('Se cambio el estado del servicio con éxito.') }
    })
  }

  manejarArchivoActualizado(){
    this.paginador.inicializarPaginacion()
  }

  abrirModalCrear(){
    this.modalCrear.abrir()
  }

  abrirModalActualizar(archivo: TipoArchivo){
    this.modalActualizar.abrir(archivo)
  }

  formatearFecha(fechaIso: string){
    return formatearFechaIso(fechaIso, 'dd / MM / yyyy')
  }
}
