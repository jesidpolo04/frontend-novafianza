import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Amortizacion } from '../../modelos/ReporteSaldosCartera';
import { Chart } from 'chart.js';
import pluginDataLabel, { Context } from 'chartjs-plugin-datalabels'

@Component({
  selector: 'app-amortizacion-cartera',
  templateUrl: './amortizacion-cartera.component.html',
  styleUrls: ['./amortizacion-cartera.component.css']
})
export class AmortizacionCarteraComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef
  @Input() informacionGrafico?: Amortizacion
  @Input('cargando') cargando: boolean = true
  datosInsuficientes: boolean = false

  grafico?: Chart

  constructor() { }

  ngOnChanges(): void {
    if (this.informacionGrafico && this.informacionGrafico.etiquetas && this.informacionGrafico.etiquetas.length < 1) {
      this.datosInsuficientes = true
    } else {
      this.datosInsuficientes = false
    }
    if (this.canvas) {
      this.renderizarGrafico()
    }
  }

  ngAfterViewInit(): void {
    this.renderizarGrafico()
  }

  ngOnInit(): void {
  }

  public renderizarGrafico() {
    const plugin = {
      id: 'customPlugin',
      beforeInit(chart: any) {
        // Get a reference to the original fit function
        const originalFit = chart.legend!.fit;
        // Override the fit function
        chart.legend!.fit = function fit() {
          // Call the original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)();
          // Change the height as suggested in other answers
          this.height += 15;
        }
      }
    }
    this.grafico?.destroy()
    if (!this.informacionGrafico) return;
    this.grafico = new Chart(this.canvas.nativeElement, {
      plugins: [
        pluginDataLabel,
        plugin
      ],
      options: {
        scales: {
          y: {
            ticks: {
              callback: (value, index, ticks)=>{
                return '%' +  value
              }
            }
          }
        },
        layout: {
          
        },
        plugins: {
          legend: {
            align: 'center',
            labels: {
              usePointStyle: true,
            },
          },
          datalabels: {
            /* anchor: 'end', */
            anchor: (context: Context)=>{
              const valor = context.dataset.data[context.dataIndex] as number;
              return  valor && valor < 0 ? 'start' : 'end' 
            },
            formatter: (value: number, context: Context) => {
              return "%" + value
            }
          }
        }
      },
      data: {
        labels: this.informacionGrafico.etiquetas,
        datasets: [
          {
            type: 'bar',
            label: this.informacionGrafico.amortizacion.etiqueta,
            data: this.informacionGrafico.amortizacion.datos,
            backgroundColor: '#2DBFFF',
            order: 10,
            pointStyle: 'rect'
          }

          /* ,
          {
            type: 'line',
            label: 'dataset2',
            data: [1, 2, 3],
            backgroundColor: '#202256',
            borderColor: '#202256',
            order: 0,
            pointStyle: 'circle',
          },
          {
            type: 'line',
            label: 'dataset3',
            data: [3, 6, 1],
            backgroundColor: '#FFAA00',
            borderColor: '#FFAA00',
            order: 0,
            pointStyle: 'circle'
          } */
        ]
      },
    })
  }

}
