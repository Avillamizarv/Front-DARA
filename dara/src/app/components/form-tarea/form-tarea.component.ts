import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectoModel } from 'src/app/model/proyecto-model';

@Component({
  selector: 'app-form-tarea',
  templateUrl: './form-tarea.component.html',
  styleUrls: ['./form-tarea.component.scss'],
})
export class FormTareaComponent {
  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      insertMode?: boolean;
    }
  ) {}

  /**
   * Variable que contiene el formulario de búsqueda
   */
  form: UntypedFormGroup;

  /**
   * Variable que contiene la lista de proyectos
   * */
  proyectos: ProyectoModel[];

  ngOnInit(): void {
    this.getProyectos();
    this.buildForm();
  }

  /**
   * Función que se ejecuta para crear el formulario de filtro por ciudad o tipo de animal
   * */
  buildForm() {
    this.form = this.fb.group({
      id: [],
      idProyecto: [],
      fecha: [],
      descripcion: [''],
    });
  }

  /**
   * Función para obtener la lista de proyectos
   * */
  getProyectos() {
    this.proyectos = [
      { nombre: 'Universidad', id: 1, fechaRegistro: new Date() },
      { nombre: 'Trabajo de grado', id: 2, fechaRegistro: new Date() },
    ];
  }

  limpiarFormulario() {
    this.form.reset();
  }
}
