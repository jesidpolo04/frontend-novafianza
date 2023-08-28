import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import  pluginDataLabel from 'chartjs-plugin-datalabels'


@Component({
  selector: 'app-grafico-barras-lineas',
  templateUrl: './grafico-barras-lineas.component.html',
  styleUrls: ['./grafico-barras-lineas.component.css']
})
export class GraficoBarrasLineasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef
/*   @Input('grafico') informacionGrafico: Grafico | undefined */

  grafico?: Chart

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderizarGrafico()
  }

  public renderizarGrafico() {
    this.grafico = new Chart(this.canvas.nativeElement, {
      plugins: [pluginDataLabel],
      options: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              
            }
          },
          datalabels: {
            anchor: 'end',
            align: 'top'
          }
        }
      },
      data: {
        labels: [
          ['mes1', 'info1', 'extra1'],
          ['mes2', 'info2', 'extra2'],
          ['mes3', 'info3', 'extra3'],
          ['mes3', 'info3', 'extra3'],
          ['mes3', 'info3', 'extra3'],
          ['mes3', 'info3', 'extra3'],
          ['mes3', 'info3', 'extra3'],
          ['mes3', 'info3', 'extra3'],
          ['mes3', 'info3', 'extra3'],
        ],
        /* labels: ['mes1', 'mes2', 'mes3'], */
        datasets: [
          {
            type: 'bar',
            label: 'dataset1',
            data: [4, 6, 8, 5, 2, 7, 6, 8, 9],
            backgroundColor: '#98A2B5',
            order: 10,
            pointStyle: 'rect'
          },
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
          }
        ]
      },
    })
  }

}
