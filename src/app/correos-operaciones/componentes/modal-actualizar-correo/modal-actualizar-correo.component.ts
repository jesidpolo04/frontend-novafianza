import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CorreoOperacion } from '../../modelos/CorreoOperacion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';
import { ServicioCorreosOperaciones } from '../../servicios/correos-operaciones.service';

@Component({
  selector: 'app-modal-actualizar-correo',
  templateUrl: './modal-actualizar-correo.component.html',
  styleUrls: ['./modal-actualizar-correo.component.css']
})
export class ModalActualizarCorreoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  @Output() correoActualizado: EventEmitter<void>
  correo?: CorreoOperacion

  formulario: FormGroup<{
    correo: FormControl<string | null>,
    estado: FormControl<boolean | null>
  }>

  constructor(private servicioModal: NgbModal, private servicioCorreos: ServicioCorreosOperaciones) {
    this.correoActualizado = new EventEmitter<void>();
    this.formulario = new FormGroup<{
      correo: FormControl<string | null>,
      estado: FormControl<boolean | null>
    }>({
      correo: new FormControl<string>("", [ Validators.required, Validators.email ]),
      estado: new FormControl<boolean>(false, [ Validators.required ]),
    })
  }

  ngOnInit(): void {
  }

  actualizarCorreo(){
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      this.popup.abrirPopupFallido('Formulario inválido', 'Rellena todos los campos correctamente')
      return;
    }
    this.servicioCorreos.actualizarCorreo(this.correo!.id, {
      correo: this.formulario.controls.correo.value!,
      estado: this.correo!.estado
    }).subscribe({
      next: ()=>{
        this.correoActualizado.emit()
        this.popup.abrirPopupExitoso('Guardado con éxito.')
      },
      error: ()=>{
        this.popup.abrirPopupFallido('Ocurrió un error inesperado', 'Intentalo más tarde')
      }
    })
  }

  abrir(correo: CorreoOperacion){
    this.correo = correo
    this.limpiarFormulario()
    this.rellenarCampos(correo)
    this.servicioModal.open( this.modal, {
      size: 'xl'
    })
  }

  cerrar(){
    this.servicioModal.dismissAll()
  }

  rellenarCampos(correo: CorreoOperacion){
    this.formulario.controls.correo.setValue(correo.correo)
    this.formulario.controls.estado.setValue(correo.estado)
  }

  limpiarFormulario(){
    this.formulario.reset()
  }
}
