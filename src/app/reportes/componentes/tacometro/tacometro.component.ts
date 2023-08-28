import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tacometro',
  templateUrl: './tacometro.component.html',
  styleUrls: ['./tacometro.component.css']
})
export class TacometroComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef
  @Input() porcentaje: number = 0
  @Input() color: string = "#32BEC1"

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.canvas){
      this.graficarTacometro();
    }
  }
  ngAfterViewInit(): void {
    this.graficarTacometro()
  }

  ngOnInit(): void {
  }

  graficarTacometro(){
    let canvas = this.canvas.nativeElement as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    if(!ctx) return;

    // Define el centro y el radio del círculo
    let centerX = canvas.width / 2;
    let centerY = canvas.height;
    let radius = 120;

    // Define el ángulo inicial y el ángulo final para el semiarco gris (360 grados para un círculo completo)
    let startAngleGray = Math.PI;
    let endAngleGray = 0;

    // Dibuja el semiarco gris
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngleGray, endAngleGray);
    ctx.strokeStyle = "#D2D6DE";
    ctx.lineWidth = 50;
    ctx.stroke();

    // Calcula el ángulo para el semiarco azul
    let startAngleBlue = Math.PI;
/*     let endAngleBlue = - (((100 - this.porcentaje) / 100) * Math.PI);
 */    let endAngleBlue = Math.PI + (Math.PI  * (this.porcentaje / 100))

    // Dibuja el semiarco azul
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngleBlue, endAngleBlue);
    ctx.strokeStyle = this.color;
    ctx.stroke();

    // Agrega el texto del porcentaje justo debajo del semiarco azul
    ctx.fillStyle = "black";
    ctx.font = "bold 24px Arial";
    ctx.fillText(this.porcentaje + "%", centerX - 20, centerY);

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Actual", centerX - 20, centerY - 30);
}

}
