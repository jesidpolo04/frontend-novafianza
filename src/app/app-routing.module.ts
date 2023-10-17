import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './administrador/componentes/plantilla/plantilla.component';
import { InicioSesionComponent } from './autenticacion/componentes/inicio-sesion/inicio-sesion.component';
import { GestionDeUsuariosComponent } from './usuarios/componentes/gestion-de-usuarios-empresas/gestion-de-usuarios.component';
import { ActualizarContrasenaComponent } from './autenticacion/componentes/actualizar-contrasena/actualizar-contrasena.component';
import { ReportesComponent } from './administrador/componentes/paginas/reportes/reportes.component';
import { PaginaCargaArchivosComponent } from './archivos/componentes/carga-archivos/pagina-carga-archivos.component';
import { ConfiguracionDeCuentaComponent } from './administrador/componentes/paginas/configuracion-de-cuenta/configuracion-de-cuenta.component';
import { ConsultaDeudaComponent } from './pago/componentes/consulta-deuda/consulta-deuda.component';
import { MetodoPagoWompiComponent} from './pago/componentes/metodo-pago-wompi/metodo-pago-wompi.component';
import { TransaccionComponent} from './pago/componentes/transaccion/transaccion.component';
import { FormularioProcesoPagoComponent } from './pago/componentes/formulario-proceso-pago/formulario-proceso-pago.component';
import { PaginaHistorialNovedadesComponent } from './historial-novedades/componentes/pagina-historial-novedades/pagina-historial-novedades.component';
import { PaginaAdministrarEmpresasComponent } from './empresas/componentes/pagina-administrar-empresas/pagina-administrar-empresas.component';
import { PaginaGestionArchivosComponent } from './archivos/componentes/pagina-gestion-archivos/pagina-gestion-archivos.component';
import { PaginaVisualizacionVariablesComponent } from './variables/componentes/pagina-visualizacion-variables/pagina-visualizacion-variables.component';
import { PaginaReportesComponent } from './reportes/componentes/pagina-reportes/pagina-reportes.component';
import { PaginaReporteColocacionComponent } from './reportes/componentes/tipos-reportes/pagina-reporte-colocacion/pagina-reporte-colocacion.component';
import { PaginaReporteSaldosCarteraComponent } from './reportes/componentes/tipos-reportes/pagina-reporte-saldos-cartera/pagina-reporte-saldos-cartera.component';
import { PaginaReporteOperacionesComponent } from './reportes/componentes/tipos-reportes/pagina-reporte-operaciones/pagina-reporte-operaciones.component';
import { PaginaCorreosOperacionesComponent } from './correos-operaciones/paginas/pagina-correos-operaciones/pagina-correos-operaciones.component';


const routes: Routes = [
  {
    path: 'administrar',
    component: PlantillaComponent,
    children: [
      {
        path: 'correos_operaciones',
        component: PaginaCorreosOperacionesComponent
      },
      {
        path: 'visualizar_variables',
        component: PaginaVisualizacionVariablesComponent
      },
      {
        path: 'crear_usuarios',
        component: GestionDeUsuariosComponent
      },
      {
        path: 'entidades',
        component: PaginaAdministrarEmpresasComponent
      },
      {
        path: 'cargar_archivos',
        component: PaginaCargaArchivosComponent
      },
      {
        path: 'servicios',
        component: PaginaGestionArchivosComponent
      },
      {
        path: 'historial_novedades',
        component: PaginaHistorialNovedadesComponent
      },
      {
        path: 'reportes',
        component: PaginaReportesComponent,
        children: [
          {
            path: 'colocacion',
            component: PaginaReporteColocacionComponent
          },
          {
            path: 'saldos-cartera',
            component: PaginaReporteSaldosCarteraComponent
          },
          {
            path: 'operaciones',
            component: PaginaReporteOperacionesComponent
          }
        ]
      },
      {
        path: 'configuracion_de_cuenta',
        component: ConfiguracionDeCuentaComponent
      },
    ],
    // canActivate: [AutenticacionGuard, AutorizacionGuard]

  },
  {
    path: 'consulta-obligacion',
    component: ConsultaDeudaComponent
  },
  {
    path: 'proceso-pago',
    component: FormularioProcesoPagoComponent
  },
  {
    path: 'pagar-obligacion',
    component: MetodoPagoWompiComponent
  },
  {
    path: 'pago',
    component: TransaccionComponent
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent
  },
  {
    path: 'actualizar-contrasena',
    component: ActualizarContrasenaComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio-sesion'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
