export interface TipoArchivo {
    id:             string;
    nombre:         string;
    descripcion:    string;
    formatoId:      string;
    manual:         string | null;
    tipo:           number;
    prefijo:        string;
    prefijoArchivo: string;
    prefijoParametrizacion: string;
    estado:         boolean;
    createdAt:      string;
}
