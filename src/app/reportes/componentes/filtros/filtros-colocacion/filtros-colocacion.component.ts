import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { FormatoFechas } from 'src/app/compartido/FormatoFechas';
import { FiltrosColocacion } from 'src/app/reportes/modelos/Filtros/FiltrosColocacion';
import { Producto } from 'src/app/reportes/modelos/Producto';
import { ServicioReportes } from 'src/app/reportes/servicios/reportes.service';

@Component({
  selector: 'app-filtros-colocacion',
  templateUrl: './filtros-colocacion.component.html',
  styleUrls: ['./filtros-colocacion.component.css']
})
export class FiltrosColocacionComponent implements OnInit {
  @Output('nuevosFiltros') nuevosFiltros: EventEmitter<FiltrosColocacion>;

  producto: string;
  productos: Producto[] = []
  anioInicio: number;
  mesInicio: number;
  anioFinal: number;
  mesFinal: number;
  empresa: string;
  empresas: Empresa[] = []

  fechaInicial: DateTime;
  fechaFinal: DateTime;

  filtros?: FiltrosColocacion

  esUsuarioEmpresa: boolean;

  constructor(
    private servicioReportes: ServicioReportes,
    private servicioLocalStorage: ServicioLocalStorage,
    private servicioEmpresas: ServicioEmpresa
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
    this.fechaFinal = DateTime.now().plus({ month: 1 }).set({ day: 1 })
    this.fechaInicial = DateTime.now().minus({ months: 3 }).set({ day: 1 })
    this.nuevosFiltros = new EventEmitter<FiltrosColocacion>();
    this.producto = ""
    this.anioFinal = fechaActual.year
    this.mesFinal = fechaActual.month
    this.anioInicio = fechaActual.year
    this.mesInicio = fechaActual.minus({ months: 3 }).month
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
          this.obtenerProductos(this.empresa)
        }
        if (!this.esUsuarioEmpresa && this.empresas.length > 0) {
          this.empresa = this.empresas[0].nit.toString()
        }
      }
    })
  }

  obtenerProductos(empresa: string) {
    this.servicioReportes.obtenerProductos(empresa).subscribe({
      next: (productos) => {
        this.productos = productos
        if(this.productos.length > 0){
          this.producto = this.productos[0].codigoProductoInterno
        }
      }
    });
  }

  manejarCambioEmpresa(empresa: string) {
    this.empresa = empresa
    this.obtenerProductos(empresa)
  }

  manejarCambioProducto(producto: string) {
    this.producto = producto
  }

  manejarCambioFechaInicial({ anio, mes }: { anio?: number, mes?: number }) {
    if (anio) {
      this.fechaInicial = this.fechaInicial.set({ year: anio })
    }
    if (mes) {
      this.fechaInicial = this.fechaInicial.set({ month: mes })
    }
  }

  manejarCambioFechaFinal({ anio, mes }: { anio?: number, mes?: number }) {
    if (anio) {
      this.fechaFinal = this.fechaFinal.set({ year: anio })
    }
    if (mes) {
      this.fechaFinal = this.fechaFinal.set({ month: mes, day: 1 }).plus({ month: 1 })
    }
  }

  actualizarFiltros() {
    this.nuevosFiltros.emit({
      fechaFinalCorte: this.fechaFinal.toFormat(FormatoFechas.FECHA_SAFIX),
      fechaInicioCorte: this.fechaInicial.toFormat(FormatoFechas.FECHA_SAFIX),
      empresa: this.empresa,
      producto: this.producto
    })
  }
}
