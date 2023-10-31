import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { TipoArchivo } from 'src/app/archivos/modelos/TipoArchivo';
import { EmpresasService } from '../../servicios/empresas.service';

@Component({
  selector: 'app-modal-adjuntar-manual',
  templateUrl: './modal-adjuntar-manual.component.html',
  styleUrls: ['./modal-adjuntar-manual.component.css']
})
export class ModalAdjuntarManualComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  formulario: FormGroup
  archivo?: TipoArchivo
  idEmpresa?: string
  instancia?: NgbModalRef

  constructor(private servicioModal: NgbModal, private servicioEmpresa: EmpresasService) { 
    this.formulario = new FormGroup({
      manual: new FormControl<File | undefined>(undefined, [ Validators.required ])
    })
  }

  ngOnInit(): void {
  }

  abrir(archivo: TipoArchivo, idEmpresa: string){
    this.limpiarFormulario()
    this.archivo = archivo
    this.idEmpresa = idEmpresa
    this.instancia = this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

  cerrar(){
    this.instancia!.close()
    this.limpiarFormulario()
  }

  adjuntarManual(){
    if(this.formulario.invalid){
      console.error('Formulario inválido', this.formulario.controls)
      throw Error('Rellena los campos correctamente')
    }
    this.servicioEmpresa.vincularManual(
      this.archivo!.id!, 
      this.idEmpresa!, 
      this.formulario.controls['manual'].value
    ).subscribe({
      next: () => {
        this.popup.abrirPopupExitoso(`Se guardó con éxito el documento: ${this.archivo!.nombre}`)
        this.limpiarFormulario()
        this.cerrar()
      },
      error: (error)=>{
        this.popup.abrirPopupFallido(`Hubo un error al momento de guardar el documento.`)
      }
    })
  }

  limpiarFormulario(){
    this.formulario.reset()
  }

}
