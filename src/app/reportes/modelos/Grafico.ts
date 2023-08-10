export interface Grafico {
    tipo: string
    grupoDatos: GrupoDato[]
    etiquetas?: string[]
}

export interface GrupoDato {
    etiqueta?: string
    etiquetas?: string[]
    color?: string
    colores?: string[]
    datos: (number | null)[]
}