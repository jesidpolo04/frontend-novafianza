import { Component, OnInit } from '@angular/core';
import { FiltrosSaldosCartera } from 'src/app/reportes/modelos/Filtros/FiltrosSaldosCartera';
import { ReporteSaldosCartera } from 'src/app/reportes/modelos/ReporteSaldosCartera';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';

@Component({
  selector: 'app-pagina-reporte-saldos-cartera',
  templateUrl: './pagina-reporte-saldos-cartera.component.html',
  styleUrls: ['./pagina-reporte-saldos-cartera.component.css']
})
export class PaginaReporteSaldosCarteraComponent implements OnInit {
  reporte?: ReporteSaldosCartera
  cargando: boolean = false

  constructor(private servicio: ServicioReportes) { }

  ngOnInit(): void {
  }

  consultarReporte(filtros: FiltrosSaldosCartera){
    this.cargando = true
    this.servicio.obtenerSaldosCartera(filtros).subscribe({
      next: (reporte: ReporteSaldosCartera)=>{
        this.reporte = reporte
      },
      error: ()=>{
        this.cargando = false
      },
      complete: ()=>{
        this.cargando = false
      }
    })
  }
}
