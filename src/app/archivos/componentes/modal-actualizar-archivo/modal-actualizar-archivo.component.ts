import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { TipoArchivo } from '../../modelos/TipoArchivo';
import { FormatoArchivo } from '../../modelos/FormatoArchivo';
import { TipoServicio } from '../../modelos/TipoServicio';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';

@Component({
  selector: 'app-modal-actualizar-archivo',
  templateUrl: './modal-actualizar-archivo.component.html',
  styleUrls: ['./modal-actualizar-archivo.component.css']
})
export class ModalActualizarArchivoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  @Output() archivoActualizado: EventEmitter<void>
  archivo?: TipoArchivo
  formulario: FormGroup
  formatosArchivo: FormatoArchivo[] = []
  tiposServicios: TipoServicio[] = []

  constructor(private servicioModal: NgbModal, private servicioArchivos: CargarArchivosService) {
    this.archivoActualizado = new EventEmitter<void>(); 
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [ Validators.required ]),
      descripcion: new FormControl<string>('', [ Validators.required ]),
      formato: new FormControl<string>('', [ Validators.required ]),
      manual: new FormControl<string>('', []),
      prefijoCarga: new FormControl<string>('', [ Validators.required ]),
      prefijoParametrizacion: new FormControl<string>('', [ Validators.required ]),
      tipoServicio: new FormControl<number | null>(null, [ Validators.required ]),
    })
  }

  actualizarTipoArchivo(){
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      return;
    }
    const controles = this.formulario.controls
    this.servicioArchivos.actualizarTipoArchivo(this.archivo!.id, {
      descripcion: controles['descripcion'].value,
      formatoId: controles['formato'].value,
      nombre: controles['nombre'].value,
      prefijo: controles['prefijoCarga'].value,
      prefijoParametrizacion: controles['prefijoParametrizacion'].value,
      tipoServicio: controles['tipoServicio'].value
    }).subscribe({
      next: ()=> {
        this.archivoActualizado.emit()
        this.popup.abrirPopupExitoso('Se ha actualizado el servicio exitosamente.')
      }
    })
  }

  ngOnInit(): void {
    this.obtenerTiposServicios()
    this.obtenerFormatosArchivo(1, 100)
  }

  obtenerFormatosArchivo(pagina: number, limite: number){
    this.servicioArchivos.obtenerFormatosArchivo(pagina, limite).subscribe({
      next: (respuesta)=>{
        this.formatosArchivo = respuesta.formatosArchivos
      }
    })
  }

  obtenerTiposServicios(){
    this.servicioArchivos.obtenerTiposServicios().subscribe({
      next: (tiposServicios)=>{
        this.tiposServicios = tiposServicios
      }
    })
  }

  abrir(archivo: TipoArchivo)
  {
    this.rellenarFormulario(archivo)
    this.archivo = archivo
    this.servicioModal.open(this.modal, {
      size: 'xl',
      centered: false
    })
  }

  limpiarFormulario(){
    this.formulario.reset()
  }

  rellenarFormulario(archivo: TipoArchivo){
    this.limpiarFormulario()
    const controles = this.formulario.controls
    controles['nombre'].setValue(archivo.nombre)
    controles['descripcion'].setValue(archivo.descripcion)
    controles['formato'].setValue(archivo.formatoId)
    controles['prefijoCarga'].setValue(archivo.prefijo)
    controles['prefijoParametrizacion'].setValue(archivo.prefijoParametrizacion)
    controles['tipoServicio'].setValue(archivo.tipo)
  }

}
