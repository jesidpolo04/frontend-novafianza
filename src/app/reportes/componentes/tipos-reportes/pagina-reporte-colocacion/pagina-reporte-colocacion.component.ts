import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FiltrosColocacion } from 'src/app/reportes/modelos/Filtros/FiltrosColocacion';
import { ReporteColocacion } from 'src/app/reportes/modelos/ReporteColocacion';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';
import { GraficoLineasComponent } from '../../grafico-lineas/grafico-lineas.component';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagina-reporte-colocacion',
  templateUrl: './pagina-reporte-colocacion.component.html',
  styleUrls: ['./pagina-reporte-colocacion.component.css']
})
export class PaginaReporteColocacionComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('graficoColocacion') graficoColocacion!: GraficoLineasComponent
  reporte?: ReporteColocacion
  filtros?: FiltrosColocacion
  cargandoReporte: boolean = false

  constructor(private servicioReportes: ServicioReportes) { }

  ngOnInit(): void {}

  obtenerColocacion(filtros: FiltrosColocacion){
    this.filtros = filtros
    this.cargandoReporte = true
    this.servicioReportes.obtenerColocacion(filtros).subscribe({
      next: (reporte)=>{
        this.reporte = reporte
      },
      error: (error: HttpErrorResponse)=>{
        if(error.status === 422){
          this.popup.abrirPopupFallido("Filtros incorrectos.", "Debes seleccionar un producto para consultar.")
        }
      },
      complete: ()=>{
        this.cargandoReporte = false
      }
    })
  }

  entrarEnPantallaCompleta(elemento: HTMLDivElement){
      elemento.requestFullscreen()
  }

  exportar(){
    if(!this.filtros){
      return;
    }
    this.servicioReportes.exportarColocacion(this.filtros)
  }

}
