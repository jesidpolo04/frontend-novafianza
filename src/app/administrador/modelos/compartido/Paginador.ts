import { Observable } from "rxjs"
import { Paginacion } from "./Paginacion"

export class Paginador {
    public readonly opcionesLimiteRegistros = [ 5, 10, 15, 20, 30 ]
    private readonly limiteRegistrosPorDefecto = 5
    private readonly paginaActualPorDefecto = 1
    private _totalRegistros?: number
    private _paginaActual: number
    private _totalPaginas?: number
    private _limiteRegistros: number
    _funcionObtenerRecursos: (pagina: number, limite: number, ...args:any) => Observable<Paginacion>

    constructor(funcionObtenerRecursos: (pagina: number, limite: number, ...args:any)=> Observable<Paginacion>) {
        this._limiteRegistros = this.limiteRegistrosPorDefecto
        this._paginaActual = this.paginaActualPorDefecto
        this._funcionObtenerRecursos = funcionObtenerRecursos
        console.log(funcionObtenerRecursos)
    }

    inicializarPaginacion(
        pagina:number = this.paginaActualPorDefecto, 
        limite: number = this.limiteRegistrosPorDefecto, 
        ...argumentos:any
    ){
        this._paginaActual = pagina;
        this._limiteRegistros = limite
        this._funcionObtenerRecursos(pagina, limite, ...argumentos).subscribe({
            next: (paginacion) => {
                this.cambiarTotales(paginacion)
            }
        })
    }

    cambiarLimitePorPagina(nuevoLimite: number, ...argumentos: any){
        this._limiteRegistros = nuevoLimite;
        if(!this._paginaActual){
            throw Error('No se ha establecido una pagina actual');
        }
        this._funcionObtenerRecursos(this._paginaActual, nuevoLimite, ...argumentos).subscribe({
            next: (paginacion) => {
                this.cambiarTotales(paginacion)
            }
        })
    }

    cambiarPagina(pagina: number, ...argumentos: any){
        this._paginaActual = pagina
        this._funcionObtenerRecursos(pagina, this._limiteRegistros, ...argumentos).subscribe({
            next: (paginacion) => {
                this.cambiarTotales(paginacion)
            }
        })
    }

    private cambiarTotales(paginacion: Paginacion){
        this._totalRegistros = paginacion.totalRegistros
        this._totalPaginas = paginacion.totalPaginas
    }

    public get totalRegistros(){
        return this._totalRegistros
    }
    public get totalPaginas(){
        return this._totalPaginas
    }
    public get paginaActual(){
        return this._paginaActual
    }
    public get limiteRegistros(){
        return this._limiteRegistros
    }
}