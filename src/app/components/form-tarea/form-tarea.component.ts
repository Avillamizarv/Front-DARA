import { Component, Inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectoModel } from 'src/app/model/proyecto-model';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';

@Component({
  selector: 'app-form-tarea',
  templateUrl: './form-tarea.component.html',
  styleUrls: ['./form-tarea.component.scss'],
})
export class FormTareaComponent {
  constructor(
    private proyectoService: ProyectoService,
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
      id: [''],
      idProyecto: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaRegistro: [],
      nombre: [''],
      estado: [1],
    });
  }

  /**
   * Función para obtener la lista de proyectos
   * */
  getProyectos() {
    this.proyectoService.getProyectoList().subscribe((res) => {
      if (res) {
        this.proyectos = res;
      }
    });
  }

  limpiarFormulario() {
    this.form.reset();
  }
}
