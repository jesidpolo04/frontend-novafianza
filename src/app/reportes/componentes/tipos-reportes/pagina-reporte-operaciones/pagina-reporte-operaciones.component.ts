import { Component, OnInit } from '@angular/core';
import { FiltrosOperaciones } from 'src/app/reportes/modelos/Filtros/FiltrosOperaciones';
import { Operaciones } from 'src/app/reportes/modelos/Operaciones';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';

@Component({
  selector: 'app-pagina-reporte-operaciones',
  templateUrl: './pagina-reporte-operaciones.component.html',
  styleUrls: ['./pagina-reporte-operaciones.component.css']
})
export class PaginaReporteOperacionesComponent implements OnInit {
  operaciones?: Operaciones
  filtros?: FiltrosOperaciones
  aplicandoFiltros: boolean = false

  constructor(private servicio: ServicioReportes) { }

  ngOnInit(): void {
  }

  consultarReporte(filtros: FiltrosOperaciones){
    this.aplicandoFiltros = true
    this.filtros = filtros
    this.servicio.obtenerOperaciones(filtros).subscribe({
      next: (operaciones)=>{
        this.operaciones = operaciones
      },
      error: (error)=>{
        console.log(error)
      },
      complete: ()=>{
        this.aplicandoFiltros = false
      }
    })
  }

}
