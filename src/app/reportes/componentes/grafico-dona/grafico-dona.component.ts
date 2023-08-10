import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Grafico } from '../../modelos/Grafico';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas') canvas!: ElementRef
  @Input('grafico') informacionGrafico: Grafico | undefined
  @Input('cargando') cargando: boolean = true

  datosInsuficientes: boolean = false
  grafico?: Chart<'doughnut', (number | null)[]>

  constructor() { 
  }

  ngOnChanges(): void {
    if(this.informacionGrafico && this.informacionGrafico.grupoDatos.length > 0 && this.informacionGrafico.grupoDatos[0].etiquetas!.length < 1){
      this.datosInsuficientes = true
      console.log('etiquetas dona .len', this.informacionGrafico.grupoDatos[0].etiquetas!.length)
      console.log('datos insuficientes', this.datosInsuficientes)
    }else{
      this.datosInsuficientes = false
      console.log('datos insuficientes', this.datosInsuficientes)
    }
    if(this.canvas){
      this.renderizarGrafico();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderizarGrafico()
  }

  public renderizarGrafico() {
    this.grafico?.destroy()
    if(!this.informacionGrafico!) return;
    this.grafico = new Chart<'doughnut', (number | null)[]>(this.canvas.nativeElement, {
      type: 'doughnut',
      plugins: [{
        id: 'doughnutLabelsLine',
        afterDraw(chart, args, options){
          const { ctx, chartArea: {top, bottom, left, right, width, height} } = chart;
          console.log(chart)
          chart.data.datasets.forEach( (dataset, i) => {
            chart.getDatasetMeta(i).data.forEach(dataPoint =>{
              
            })
          })
        }
      }],
      data: {
        labels: this.informacionGrafico.grupoDatos[0].etiquetas,
        datasets: this.informacionGrafico.grupoDatos.map( gd => {
          return {
            data: gd.datos,
            backgroundColor: gd.colores
          }
        })
      },
    })
  }
}
