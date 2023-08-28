import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import pluginDataLabel, { Context } from 'chartjs-plugin-datalabels'
import { EvolucionSaldosCartera } from '../../modelos/ReporteSaldosCartera';

@Component({
  selector: 'app-evolucion-cartera',
  templateUrl: './evolucion-cartera.component.html',
  styleUrls: ['./evolucion-cartera.component.css']
})
export class EvolucionCarteraComponent implements OnInit, OnChanges {
  @ViewChild('canvas') canvas!: ElementRef
  @Input() informacionGrafico?: EvolucionSaldosCartera
  @Input('cargando') cargando: boolean = true
  datosInsuficientes: boolean = false

  grafico?: Chart

  constructor() { }

  ngOnInit(): void {
  }

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
            anchor: 'end',
            align: 'top',
            font: {
              size: 10
            },
            formatter: (value: number, context: Context) => {
              if (context.datasetIndex !== 0) {
                if (!this.informacionGrafico) return value;
                let saldo = this.informacionGrafico.saldos.datos[context.dataIndex];
                if (!saldo) return value;
                return ((value * 100) / saldo).toFixed(2) + "%";
              } else {
                return "$" + value.toLocaleString('es')
              }
            },
            color: (context: Context) => {
              if (context.datasetIndex !== 0) {
                return '#FFFF'
              }else{
                return "#000000"
              }
            }
          }
        }
      },
      data: {
        labels: this.informacionGrafico.etiquetas,
        /* labels: ['mes1', 'mes2', 'mes3'], */
        datasets: [
          {
            type: 'bar',
            label: this.informacionGrafico.saldos.etiqueta,
            data: this.informacionGrafico.saldos.datos,
            backgroundColor: '#98A2B5',
            order: 10,
            pointStyle: 'rect'
          },
          {
            type: 'line',
            label: this.informacionGrafico.icv30.etiqueta,
            data: this.informacionGrafico.icv30.datos,
            backgroundColor: '#2DBFFF',
            borderColor: '#2DBFFF',
            order: 0,
            pointStyle: 'circle',
          },
          {
            type: 'line',
            label: this.informacionGrafico.icv60.etiqueta,
            data: this.informacionGrafico.icv60.datos,
            backgroundColor: '#32BEC1',
            borderColor: '#32BEC1',
            order: 0,
            pointStyle: 'circle',
          },
          {
            type: 'line',
            label: this.informacionGrafico.icv120.etiqueta,
            data: this.informacionGrafico.icv120.datos,
            backgroundColor: '#202256',
            borderColor: '#202256',
            order: 0,
            pointStyle: 'circle',
          },
          {
            type: 'line',
            label: this.informacionGrafico.icv150.etiqueta,
            data: this.informacionGrafico.icv150.datos,
            backgroundColor: '#FFAA00',
            borderColor: '#FFAA00',
            order: 0,
            pointStyle: 'circle',
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
