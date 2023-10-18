import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { FormatoArchivo } from '../../modelos/FormatoArchivo';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { TipoServicio } from '../../modelos/TipoServicio';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';

@Component({
  selector: 'app-modal-crear-archivo',
  templateUrl: './modal-crear-archivo.component.html',
  styleUrls: ['./modal-crear-archivo.component.css']
})
export class ModalCrearArchivoComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  formulario: FormGroup
  formatosArchivo: FormatoArchivo[] = []
  tiposServicios: TipoServicio[] = []

  constructor(private servicioModal: NgbModal, private servicioArchivos: CargarArchivosService) { 
    this.formulario = new FormGroup({
      nombre: new FormControl<string>('', [ Validators.required ]),
      formato: new FormControl<string>('', [ Validators.required ]),
      descripcion: new FormControl<string>('', [ Validators.required ]),
      manual: new FormControl<string>('', []),
      prefijoCarga: new FormControl<string>('', [ Validators.required ]),
      prefijoParametrizacion: new FormControl<string>('', [ Validators.required ]),
      tipoServicio: new FormControl<number | null>(null, [ Validators.required ]),
    })
  }

  ngOnInit(): void {
    this.obtenerTiposServicios()
    this.obtenerFormatosArchivo(1, 100)
  }

  crearTipoArchivo(){
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      return;
    }
    const controles = this.formulario.controls
    this.servicioArchivos.crearTipoArchivo({
      descripcion: controles['descripcion'].value,
      formatoId: controles['formato'].value,
      nombre: controles['nombre'].value,
      prefijo: controles['prefijoCarga'].value,
      prefijoParametrizacion: controles['prefijoParametrizacion'].value,
      tipoServicio: controles['tipoServicio'].value
    }).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso('Servicio creado correctamente.')
      }
    })
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

  abrir(){
    this.servicioModal.open(this.modal, {
      size: 'xl',
      centered: false
    })
  }

}
