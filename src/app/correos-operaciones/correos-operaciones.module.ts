import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaCorreosOperacionesComponent } from './paginas/pagina-correos-operaciones/pagina-correos-operaciones.component';
import { InputsModule } from '../inputs/inputs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertasModule } from '../alertas/alertas.module';
import { ModalActualizarCorreoComponent } from './componentes/modal-actualizar-correo/modal-actualizar-correo.component';
import { ModalCrearCorreoComponent } from './componentes/modal-crear-correo/modal-crear-correo.component';



@NgModule({
  declarations: [
    PaginaCorreosOperacionesComponent,
    ModalActualizarCorreoComponent,
    ModalCrearCorreoComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AlertasModule
  ]
})
export class CorreosOperacionesModule { }
