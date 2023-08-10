import { Component, OnInit } from '@angular/core';
import { FiltrosColocacion } from 'src/app/reportes/modelos/Filtros/FiltrosColocacion';
import { ReporteColocacion } from 'src/app/reportes/modelos/ReporteColocacion';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';

@Component({
  selector: 'app-pagina-reporte-colocacion',
  templateUrl: './pagina-reporte-colocacion.component.html',
  styleUrls: ['./pagina-reporte-colocacion.component.css']
})
export class PaginaReporteColocacionComponent implements OnInit {
  reporte?: ReporteColocacion
  filtros?: FiltrosColocacion
  cargandoReporte: boolean = true

  constructor(private servicioReportes: ServicioReportes) { }

  ngOnInit(): void {}

  obtenerColocacion(filtros: FiltrosColocacion){
    this.filtros = filtros
    this.cargandoReporte = true
    this.servicioReportes.obtenerColocacion(filtros).subscribe({
      next: (reporte)=>{
        this.reporte = reporte
        this.cargandoReporte = false
      },
      error: (error)=>{
        this.cargandoReporte = false
        console.error(error)
      }
    })
  }

}
