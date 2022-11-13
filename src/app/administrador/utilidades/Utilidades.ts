import { FormControl, FormGroup } from "@angular/forms";

export function marcarFormularioComoSucio(formulario:FormGroup):FormGroup{
    (<any>Object).values(formulario.controls).forEach((control:FormControl) => {
        control.markAsDirty();
        if (control) {
          control.markAsDirty()
        }
    });
    return formulario
}