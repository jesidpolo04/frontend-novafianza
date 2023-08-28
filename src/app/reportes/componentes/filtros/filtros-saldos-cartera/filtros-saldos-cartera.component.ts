import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { DEPARTAMENTOS } from 'src/app/reportes/Departamentos';
import { GENEROS } from 'src/app/reportes/Generos';
import { FiltrosSaldosCartera } from 'src/app/reportes/modelos/Filtros/FiltrosSaldosCartera';

@Component({
  selector: 'app-filtros-saldos-cartera',
  templateUrl: './filtros-saldos-cartera.component.html',
  styleUrls: ['./filtros-saldos-cartera.component.css']
})
export class FiltrosSaldosCarteraComponent implements OnInit {
  @Input() cargando: boolean = false
  @Output() nuevosFiltros: EventEmitter<FiltrosSaldosCartera>;

  filtros: FiltrosSaldosCartera
  fechaCierre: string
  alturaDeMora: string
  tienda: string
  genero: string
  departamentos = DEPARTAMENTOS
  generos = GENEROS

  constructor() {
    this.nuevosFiltros = new EventEmitter<FiltrosSaldosCartera>();

    let fechaActual = DateTime.now()

    this.fechaCierre = fechaActual.toFormat('yyyy-MM')
    this.alturaDeMora = 'Mayor_30',
    this.tienda = ""
    this.genero = ""

    this.filtros = {
      anioColocacion: fechaActual.year.toString(),
      mesColocacion: fechaActual.month.toString(),
      alturaDeMora: this.alturaDeMora,
      departamento: this.tienda,
      genero: this.genero
    }
  }

  ngOnInit(): void {
    this.actualizarFiltros()
  }

  reiniciarFiltros(){
    let fechaActual = DateTime.now()

    this.fechaCierre = fechaActual.toFormat('yyyy-MM')
    this.alturaDeMora = 'Mayor_30',
    this.tienda = ""
    this.genero = ""

    this.filtros = {
      anioColocacion: fechaActual.year.toString(),
      mesColocacion: fechaActual.month.toString(),
      alturaDeMora: this.alturaDeMora,
      departamento: this.tienda,
      genero: this.genero
    }
  }

  actualizarFiltros(){
    let fechaCierre = DateTime.fromFormat(this.fechaCierre, "yyyy-MM")
    this.filtros = {
      anioColocacion: fechaCierre.year.toString(),
      mesColocacion: fechaCierre.month.toString(),
      alturaDeMora: this.alturaDeMora,
      departamento: this.tienda,
      genero: this.genero
    }
    this.nuevosFiltros.emit(this.filtros)
  }

}
