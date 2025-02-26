import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
import { Grafico } from '../../modelos/Grafico';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas') canvas!: ElementRef
  @Input('grafico') informacionGrafico: Grafico | undefined
  @Input('cargando') cargando: boolean = true
  datosInsuficientes: boolean = false
  grafico?: Chart

  constructor() { 
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderizarGrafico()
  }

  public renderizarGrafico() {
    this.grafico?.destroy()
    if(!this.informacionGrafico) return;
    this.grafico = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.informacionGrafico.etiquetas,
        datasets: this.informacionGrafico.grupoDatos.map( gd => {
          return {
            data: gd.datos,
            label: gd.etiqueta,
            backgroundColor: gd.color
          }
        })
      },
    })
  }


}
