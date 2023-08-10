import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { FormatoFechas } from 'src/app/compartido/FormatoFechas';
import { FiltrosColocacion } from 'src/app/reportes/modelos/Filtros/FiltrosColocacion';

@Component({
  selector: 'app-filtros-colocacion',
  templateUrl: './filtros-colocacion.component.html',
  styleUrls: ['./filtros-colocacion.component.css']
})
export class FiltrosColocacionComponent implements OnInit {
  @Output('nuevosFiltros') nuevosFiltros: EventEmitter<FiltrosColocacion>;

  producto: string;
  anioInicio: number;
  mesInicio: number;
  anioFinal: number;
  mesFinal: number;

  fechaInicial: DateTime;
  fechaFinal: DateTime;

  filtros?: FiltrosColocacion

  constructor() {
    const fechaActual = DateTime.now()
    this.fechaFinal = DateTime.now().plus({ month: 1 }).set({ day: 1 }).minus({ days: 1 })
    this.fechaInicial = DateTime.now().minus({ months: 3 }).set({ day: 1 })
    this.nuevosFiltros = new EventEmitter<FiltrosColocacion>();
    this.producto = ""
    this.anioFinal = fechaActual.year
    this.mesFinal = fechaActual.month
    this.anioInicio = fechaActual.year
    this.mesInicio = fechaActual.minus({ months: 3 }).month
  }

  ngOnInit(): void {
    this.nuevosFiltros.emit({
      fechaFinalCorte: this.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
      fechaInicioCorte: this.fechaInicial.toFormat(FormatoFechas.FECHA_SAFIX)
    })
  }

  manejarCambioFechaInicial({anio, mes}: {anio?: number, mes?: number}){
    if(anio){
      this.fechaInicial = this.fechaInicial.set({ year: anio })
    }
    if(mes){
      this.fechaInicial = this.fechaInicial.set({ month: mes })
    }
  }

  manejarCambioFechaFinal({anio, mes}: {anio?: number, mes?: number}){
    if(anio){
      this.fechaFinal = this.fechaFinal.set({ year: anio })
    }
    if(mes){
      this.fechaFinal = this.fechaFinal.set({ month: mes })
    }
  }

  actualizarFiltros(){
    this.nuevosFiltros.emit({
      fechaFinalCorte: this.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
      fechaInicioCorte: this.fechaInicial.toFormat(FormatoFechas.FECHA_SAFIX)
    })
  }
}
