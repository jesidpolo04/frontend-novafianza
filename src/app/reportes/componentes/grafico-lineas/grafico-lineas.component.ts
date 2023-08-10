import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Grafico } from '../../modelos/Grafico';

@Component({
  selector: 'app-grafico-lineas',
  templateUrl: './grafico-lineas.component.html',
  styleUrls: ['./grafico-lineas.component.css']
})
export class GraficoLineasComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas') canvas!: ElementRef
  @Input('grafico') informacionGrafico: Grafico | undefined
  @Input('cargando') cargando: boolean = true

  datosInsuficientes: boolean = false
  grafico?: Chart

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderizarGrafico()
  }

  ngOnChanges(): void {
    if(this.informacionGrafico && this.informacionGrafico.etiquetas && this.informacionGrafico.etiquetas.length < 1){
      this.datosInsuficientes = true
    }else{
      this.datosInsuficientes = false
    }
    if(this.canvas){
      this.renderizarGrafico()
    }
  }

  public renderizarGrafico() {
    this.grafico?.destroy()
    if(!this.informacionGrafico) return;
    this.grafico = new Chart(this.canvas.nativeElement, {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels: this.informacionGrafico.etiquetas,
        datasets: this.informacionGrafico.grupoDatos.map( gd => {
          return {
            data: gd.datos.map( dato => {
              return dato ? Number(dato) / 1000000 : null;
            }),
            label: gd.etiqueta,
            borderColor: gd.color,
            backgroundColor: gd.color,
            spanGaps: true,
            fill: false
          }
        })
      },
    })
  }
}
