import { CoberturaDisponible } from "./CoberturaDisponible"
import { Grafico } from "./Grafico"
import { ResumenColocacion } from "./ResumenColocacion"

export interface ReporteColocacion{
    resumen: ResumenColocacion
    colocacion: Grafico
    generos: Grafico
    departamentos: Grafico
    fianzasNetas: Grafico
    creditosDesembolsados: Grafico
    coberturasDisponibles: CoberturaDisponible[]
}