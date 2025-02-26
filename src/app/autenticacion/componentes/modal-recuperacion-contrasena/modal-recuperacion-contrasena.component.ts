import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { PeticionRecuperarContrasena } from '../../modelos/PeticionRecuperarContrasena';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-modal-recuperacion-contrasena',
  templateUrl: './modal-recuperacion-contrasena.component.html',
  styleUrls: ['./modal-recuperacion-contrasena.component.css']
})
export class ModalRecuperacionContrasenaComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!:PopupComponent
  public formulario:FormGroup

  constructor(private servicioModal: NgbModal, private servicioAutenticacion: AutenticacionService) {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6,10}")]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {

  }

  public abrir(): void{
    this.servicioModal.open(this.modal, {
      size: 'lg'
    })
  }

  public recuperacion():void {
    if (this.formulario.invalid) {
      console.log(this.formulario.controls)
      this.marcarFormularioComoSucio();
    }
    if (this.formulario.valid) {
      this.servicioAutenticacion.recuperarContraseña(new PeticionRecuperarContrasena(
        (this.formulario.controls['usuario'].value).toString(),
        this.formulario.controls['correo'].value
      )).subscribe((respuesta) => {
        this.popup.abrirPopupExitoso('Hemos enviado a su correo electronico las instrucciones para recuperar su contraseña')
        this.limpiarFormulario();
        this.servicioModal.dismissAll();
        console.log(respuesta);
      }), (error: HttpErrorResponse) => {
        this.popup.abrirPopupFallido('Error')
        }
    }
  }

  public marcarFormularioComoSucio():void{
    (<any>Object).values(this.formulario.controls).forEach((control:FormControl) => {
      control.markAsDirty();
      if (control) {
        control.markAsDirty()
      }
    });
  }

  public limpiarFormulario(){
    this.formulario.reset()
  }
}
