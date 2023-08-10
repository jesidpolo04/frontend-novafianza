import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaReportesComponent } from './componentes/pagina-reportes/pagina-reportes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraficoBarrasComponent } from './componentes/grafico-barras/grafico-barras.component';
import { RouterModule } from '@angular/router';
import { PaginaReporteColocacionComponent } from './componentes/tipos-reportes/pagina-reporte-colocacion/pagina-reporte-colocacion.component';
import { PaginaReporteSaldosCarteraComponent } from './componentes/tipos-reportes/pagina-reporte-saldos-cartera/pagina-reporte-saldos-cartera.component';
import { PaginaReporteOperacionesComponent } from './componentes/tipos-reportes/pagina-reporte-operaciones/pagina-reporte-operaciones.component';
import { FiltrosColocacionComponent } from './componentes/filtros/filtros-colocacion/filtros-colocacion.component';
import { GraficoLineasComponent } from './componentes/grafico-lineas/grafico-lineas.component';
import { GraficoDonaComponent } from './componentes/grafico-dona/grafico-dona.component';
import { CargandoGraficoComponent } from './componentes/cargando-grafico/cargando-grafico.component';
import { FiltrosSaldosCarteraComponent } from './componentes/filtros/filtros-saldos-cartera/filtros-saldos-cartera.component';
import { FiltrosOperacionesComponent } from './componentes/filtros/filtros-operaciones/filtros-operaciones.component';
import { GraficoBarrasLineasComponent } from './componentes/grafico-barras-lineas/grafico-barras-lineas.component';
import { DatosInsuficientesComponent } from './componentes/datos-insuficientes/datos-insuficientes.component';



@NgModule({
  declarations: [
    PaginaReportesComponent,
    GraficoBarrasComponent,
    PaginaReporteColocacionComponent,
    PaginaReporteSaldosCarteraComponent,
    PaginaReporteOperacionesComponent,
    FiltrosColocacionComponent,
    GraficoLineasComponent,
    GraficoDonaComponent,
    CargandoGraficoComponent,
    FiltrosSaldosCarteraComponent,
    FiltrosOperacionesComponent,
    GraficoBarrasLineasComponent,
    DatosInsuficientesComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportesModule { }
