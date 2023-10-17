import { Component, OnInit, ViewChild } from '@angular/core';
import { CorreoOperacion } from '../../modelos/CorreoOperacion';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { ServicioCorreosOperaciones } from '../../servicios/correos-operaciones.service';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { ModalActualizarCorreoComponent } from '../../componentes/modal-actualizar-correo/modal-actualizar-correo.component';
import { ModalCrearCorreoComponent } from '../../componentes/modal-crear-correo/modal-crear-correo.component';

@Component({
  selector: 'app-pagina-correos-operaciones',
  templateUrl: './pagina-correos-operaciones.component.html',
  styleUrls: ['./pagina-correos-operaciones.component.css']
})
export class PaginaCorreosOperacionesComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('modalActualizar') modalActualizar!: ModalActualizarCorreoComponent
  @ViewChild('modalCrear') modalCrear!: ModalCrearCorreoComponent
  correos: CorreoOperacion[] = []

  constructor(private servicioCabecera: ServicioCabeceraService, private servicioCorreos: ServicioCorreosOperaciones) { 
    this.servicioCabecera.actualizarTitulo(['Administrar correos operaciones', ''])
  }

  ngOnInit(): void {
    this.obtenerCorreos()
  }

  abrirModalActualizarCorreo(correo: CorreoOperacion){
    this.modalActualizar.abrir(correo)
  }

  abrirModalCrearCorreo(){
    this.modalCrear.abrir()
  }

  cambiarEstadoCorreo(correo: CorreoOperacion){
    this.servicioCorreos.actualizarCorreo(correo.id, {
      correo: correo.correo,
      estado: !correo.estado
    }).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso('Guardado con éxito')
      },
      error: ()=>{
        this.popup.abrirPopupFallido('Ocurrió un error inesperado')
      }
    })
  }

  obtenerCorreos(){
    this.servicioCorreos.obtenerCorreos().subscribe({
      next: (correos)=>{
        this.correos = correos
      }
    })
  }

  eliminarCorreo(correo: CorreoOperacion){
    this.servicioCorreos.eliminarCorreo(correo.id).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso('Guardado con éxito')
        this.obtenerCorreos()
      },
      error: ()=>{
        this.popup.abrirPopupFallido('Ocurrió un error inesperado', 'Intentalo más tarde')
      }
    })
  }

  manejarCorreoCreado(){
    this.obtenerCorreos()
  }

  manejarCorreoActualizado(){
    this.obtenerCorreos()
  }
}
