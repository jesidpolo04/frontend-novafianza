import { GrupoDato } from "./Grafico"


export interface ReporteSaldosCartera{
    rodamientoCartera: RodamientoCartera[]
    cosechas: Cosechas
    evolucionSaldosCartera: EvolucionSaldosCartera
    amortizacion: Amortizacion
    perdidaIncurrida: PerdidaIncurrida[]
    disponibleCoberturas: DisponibleCoberturasAlturaMora[]
    perdidaPotencial: PerdidaPotencial
    totales: VariablesTotales
}

export interface RodamientoCartera{
    fechaCierre: string
    rango_0_30Dias: number | null
    rango_31_60Dias: number | null
    rango_61_90Dias: number | null
    rango_91_120Dias: number | null
    rango_121_150Dias: number | null
    rango_151_180Dias: number | null
    rango_181_210Dias: number | null
    rango_211_240Dias: number | null
    rango_241_270Dias: number | null
    rango_271_300Dias: number | null
    rango_301_330Dias: number | null
    rango_331_360Dias: number | null
    rango_361MasDias: number | null
}

export interface Cosechas{
    cabecerasMeses: string[]
    cosechas: Cosecha[]
}

export interface Cosecha{
    fecha: string
    vlrColocacion: number
    numCreditos: number
    ticket: number
    plazo: number
    saldo: number
    mesesMaduracion: MesMaduracion[]
}

export interface MesMaduracion{
    mes: string
    valor: number
}

export interface EvolucionSaldosCartera{
    etiquetas: string[]
    subEtiquetas: SubEtiquetaAnio[]
    saldos: GrupoDato
    icv30: GrupoDato
    icv60: GrupoDato
    icv120: GrupoDato
    icv150: GrupoDato
}

export interface SubEtiquetaAnio{
    anio: string
    numeroMeses: number
}

export interface Amortizacion{
    etiquetas: string[]
    subEtiquetas: SubEtiquetaAnio[]
    amortizacion: GrupoDato
}

export interface PerdidaIncurrida{
    fechaColocacion: string
    colocacion: number
    fianzasNetas: number
    disponibleParaPagos: number
    reclamacionHastaPenultimoMes: number
    reclamacionUltimoMes: number
    disponibleParaPagoNeto: number
    perdidaIncurrida: number
    saldos120Mas: number
    disponibleCoberturaPorAlturaDeMora: number
}

export interface DisponibleCoberturasAlturaMora{
    alturaMora: string
    saldoPorAlturaMora: number
    disponibleParaCoberturas: number
    porcentajeCobertura: number
}

export interface PerdidaPotencial{
    porcentajeCobertura60Mas: number | null,
    porcentajeCobertura120Mas: number | null
}

export interface VariablesTotales{
    iCV30mas: number;
    iCV60mas: number;
    iCV120mas: number;
    iCV150mas: number;
    vlrReclamaciones: number;
    vlrColocaciones: number;
    numCredtitos: number;
    ticketPromedio: number;
    plazo: number;
}