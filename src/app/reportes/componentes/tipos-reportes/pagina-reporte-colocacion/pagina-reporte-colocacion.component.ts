import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FiltrosColocacion } from 'src/app/reportes/modelos/Filtros/FiltrosColocacion';
import { ReporteColocacion } from 'src/app/reportes/modelos/ReporteColocacion';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';
import { GraficoLineasComponent } from '../../grafico-lineas/grafico-lineas.component';

@Component({
  selector: 'app-pagina-reporte-colocacion',
  templateUrl: './pagina-reporte-colocacion.component.html',
  styleUrls: ['./pagina-reporte-colocacion.component.css']
})
export class PaginaReporteColocacionComponent implements OnInit {
  @ViewChild('graficoColocacion') graficoColocacion!: GraficoLineasComponent
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

  entrarEnPantallaCompleta(elemento: HTMLDivElement){
      elemento.requestFullscreen()
  }

}
