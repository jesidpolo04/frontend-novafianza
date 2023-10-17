import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { PlantillaComponent } from './componentes/plantilla/plantilla.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { BarraNavegacionComponent } from './componentes/barra-navegacion/barra-navegacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopupComponent } from '../alertas/componentes/popup/popup.component';
import { HistorialNovedadesComponent } from './componentes/paginas/historial-novedades/historial-novedades.component';
import { ReportesComponent } from './componentes/paginas/reportes/reportes.component';
import { ConfiguracionDeCuentaComponent } from './componentes/paginas/configuracion-de-cuenta/configuracion-de-cuenta.component';
import { HistorialNovedadesModule } from '../historial-novedades/historial-novedades.module';
import { ArchivosModule } from '../archivos/archivos.module';
import { EmpresasModule } from '../empresas/empresas.module';
import { AlertasModule } from '../alertas/alertas.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { VariablesModule } from '../variables/variables.module';
import { ReportesModule } from '../reportes/reportes.module';
import { CorreosOperacionesModule } from '../correos-operaciones/correos-operaciones.module';



@NgModule({
  declarations: [
    PlantillaComponent,
    MenuLateralComponent,
    BarraNavegacionComponent,
    HistorialNovedadesComponent,
    ReportesComponent,
    ConfiguracionDeCuentaComponent,
  ],
  imports: [
    CommonModule,
    HistorialNovedadesModule,
    ArchivosModule,
    EmpresasModule,
    CorreosOperacionesModule,
    AlertasModule,
    UsuariosModule,
    VariablesModule,
    ReportesModule,
    AdministradorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
  ],
  exports:[]
})
export class AdministradorModule { }
