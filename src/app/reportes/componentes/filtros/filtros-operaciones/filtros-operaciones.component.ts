import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { FormatoFechas } from 'src/app/compartido/FormatoFechas';
import { FiltrosColocacion } from 'src/app/reportes/modelos/Filtros/FiltrosColocacion';
import { FiltrosOperaciones } from 'src/app/reportes/modelos/Filtros/FiltrosOperaciones';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';

@Component({
  selector: 'app-filtros-operaciones',
  templateUrl: './filtros-operaciones.component.html',
  styleUrls: ['./filtros-operaciones.component.css']
})
export class FiltrosOperacionesComponent implements OnInit {
  @Output('nuevosFiltros') nuevosFiltros: EventEmitter<FiltrosOperaciones>;
  @Input() aplicando: boolean = false

  producto: string;
  anioInicio: number;
  mesInicio: number;
  anioFinal: number;
  mesFinal: number;
  anioColocacion: string;
  mesColocacion: string;

  fechaInicial: DateTime;
  fechaFinal: DateTime;

  esUsuarioEmpresa: boolean
  empresa: string
  empresas: Empresa[] = []

  tipo: 'COLOCACION' | 'DESEMBOLSO' = 'DESEMBOLSO'

  filtros?: FiltrosOperaciones

  constructor(
    private servicioLocalStorage: ServicioLocalStorage,
    private servicioEmpresas: ServicioEmpresa,
    private servicioReporte: ServicioReportes
  ) {
    const usuario = this.servicioLocalStorage.obtenerUsuario()
    if (!usuario) throw Error("Usuario no identificado.");
    if (usuario.idEmpresa) {
      this.esUsuarioEmpresa = true
      this.empresa = usuario.idEmpresa
    } else {
      this.esUsuarioEmpresa = false
      this.empresa = ""
    }

    const fechaActual = DateTime.now()

    this.nuevosFiltros = new EventEmitter<FiltrosOperaciones>();
    this.producto = ""
    this.anioFinal = fechaActual.year
    this.mesFinal = fechaActual.month
    this.anioInicio = fechaActual.year
    this.mesInicio = fechaActual.minus({ months: 3 }).month

    this.fechaFinal = DateTime.now().plus({ month: 1 }).set({ day: 1 }).minus({ days: 1 })
    this.fechaInicial = DateTime.now().minus({ months: 3 }).set({ day: 1 })
    this.anioColocacion = this.fechaFinal.toFormat('yyyy')
    this.mesColocacion = this.fechaFinal.toFormat('MM')
  }

  ngOnInit(): void {
    this.servicioEmpresas.obtenerEmpresas(1, 500).subscribe({
      next: (respuesta) => {
        this.empresas = respuesta.empresas
        if (this.esUsuarioEmpresa) {
          const empresa = this.empresas.find( empresa => empresa.id.toString() === this.empresa)
          if(empresa){
            this.empresa = empresa.nit.toString();
          }
        }
        if (!this.esUsuarioEmpresa && this.empresas.length > 0) {
          this.empresa = this.empresas[0].nit.toString()
        }
      }
    })
  }

  manejarCambioDeTipo(tipo: 'COLOCACION' | 'DESEMBOLSO'){
    if(tipo === 'DESEMBOLSO'){
      this.filtros = {
        empresa: this.empresa,
        fechaFinalDesembolso: this.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
        fechaInicioDesembolso: this.fechaInicial.toFormat(FormatoFechas.FECHA_SAFIX)
      }
      this.nuevosFiltros.emit(this.filtros)
    }if(tipo === 'COLOCACION'){
      this.filtros = {
        empresa: this.empresa,
        anioColocacion: this.anioColocacion,
        mesColocacion: this.mesColocacion
      }
      this.nuevosFiltros.emit(this.filtros)
    }
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
    if(this.tipo === 'COLOCACION'){
      this.filtros = {
        empresa: this.empresa,
        anioColocacion: this.anioColocacion,
        mesColocacion: this.mesColocacion
      }
      this.nuevosFiltros.emit(this.filtros)
    }
    else if(this.tipo === 'DESEMBOLSO'){
      this.filtros = {
        empresa: this.empresa,
        fechaFinalDesembolso: this.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
        fechaInicioDesembolso: this.fechaInicial.toFormat(FormatoFechas.FECHA_SAFIX),
      }
      this.nuevosFiltros.emit(this.filtros)
    }else{
      throw new Error('Tipo de filtro inválido o no seleccionado.')
    }
  }

  exportar(){
    if(!this.filtros){
      return;
    }
    this.servicioReporte.exportarOperaciones(this.filtros)
  }
}
