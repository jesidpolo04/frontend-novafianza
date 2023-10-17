import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { ServicioCorreosOperaciones } from '../../servicios/correos-operaciones.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-crear-correo',
  templateUrl: './modal-crear-correo.component.html',
  styleUrls: ['./modal-crear-correo.component.css']
})
export class ModalCrearCorreoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  @Output() correoCreado: EventEmitter<void>
  formulario: FormGroup<{
    correo: FormControl<string | null>,
  }>

  constructor(private servicioCorreos: ServicioCorreosOperaciones, private servicioModal: NgbModal) {
    this.correoCreado = new EventEmitter<void>() 
    this.formulario = new FormGroup<{
      correo: FormControl<string | null>
    }>({
      correo: new FormControl<string>("", [ Validators.required, Validators.email ]),
    })
  }

  ngOnInit(): void {
  }

  abrir(){
    this.limpiarFormulario()
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

  cerrar(){
    this.servicioModal.dismissAll()
  }

  crearCorreo(){
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      this.popup.abrirPopupFallido('Formulario inválido', 'Rellena todos los campos correctamente')
      return;
    }
    this.servicioCorreos.crearCorreo({
      correo: this.formulario.controls.correo.value!,
      estado: true
    }).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso('Guardado con éxito')
        this.limpiarFormulario()
        this.cerrar()
        this.correoCreado.emit()
      }
    })
  }

  limpiarFormulario(){
    this.formulario.reset()
  }

}
