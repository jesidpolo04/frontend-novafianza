import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { DEPARTAMENTOS } from 'src/app/reportes/Departamentos';
import { GENEROS } from 'src/app/reportes/Generos';
import { FiltrosSaldosCartera } from 'src/app/reportes/modelos/Filtros/FiltrosSaldosCartera';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';

@Component({
  selector: 'app-filtros-saldos-cartera',
  templateUrl: './filtros-saldos-cartera.component.html',
  styleUrls: ['./filtros-saldos-cartera.component.css']
})
export class FiltrosSaldosCarteraComponent implements OnInit {
  @Input() cargando: boolean = false
  @Output() nuevosFiltros: EventEmitter<FiltrosSaldosCartera>;

  filtros?: FiltrosSaldosCartera
  fechaCierre: string
  alturaDeMora: string
  tienda: string
  genero: string
  departamentos = DEPARTAMENTOS
  generos = GENEROS

  empresa: string
  empresas: Empresa[] = []

  esUsuarioEmpresa: boolean

  constructor(
    private servicioLocalStorage: ServicioLocalStorage,
    private servicioEmpresas: ServicioEmpresa,
    private servicioReporte: ServicioReportes
  ) {
    this.nuevosFiltros = new EventEmitter<FiltrosSaldosCartera>();

    const usuario = this.servicioLocalStorage.obtenerUsuario()
    if (!usuario) throw Error("Usuario no identificado.");
    if (usuario.idEmpresa) {
      this.esUsuarioEmpresa = true
      this.empresa = usuario.idEmpresa
    } else {
      this.esUsuarioEmpresa = false
      this.empresa = ""
    }

    let fechaActual = DateTime.now()

    this.fechaCierre = fechaActual.toFormat('yyyy-MM-dd')
    this.alturaDeMora = 'Mayor_30',
    this.tienda = ""
    this.genero = ""
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

  reiniciarFiltros(){
    let fechaActual = DateTime.now()

    this.fechaCierre = fechaActual.toFormat('yyyy-MM-dd')
    this.alturaDeMora = 'Mayor_30',
    this.tienda = ""
    this.genero = ""

    this.filtros = {
      fechaCierre: this.fechaCierre,
      alturaDeMora: this.alturaDeMora,
      departamento: this.tienda,
      genero: this.genero,
      empresa: this.empresa
    }
  }

  actualizarFiltros(){
    this.filtros = {
      fechaCierre: this.fechaCierre,
      alturaDeMora: this.alturaDeMora,
      departamento: this.tienda,
      genero: this.genero,
      empresa: this.empresa
    }
    this.nuevosFiltros.emit(this.filtros)
  }

  exportar(){
    if(!this.filtros){
      return;
    }
    this.servicioReporte.exportarSaldosCartera(this.filtros)
  }

}
