import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/app/common/services/crud.service';
import { ProyectoModel } from 'src/app/model/proyecto-model';
import { TareaModel } from 'src/app/model/tarea-model';
import { TareaService } from 'src/app/services/tarea/tarea.service';
import { FormTareaComponent } from '../form-tarea/form-tarea.component';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent implements OnInit {
  /**
   * Vistas a componentes hijos para el paginador y ordenamiento de la tabla.
   * */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  /**
   * Variable que contiene la data de la tabla
   */
  dataSource = new MatTableDataSource<TareaModel>();

  /**
   * Variable que contiene el formulario de búsqueda
   */
  form: UntypedFormGroup;

  /**
   * Variable que contiene la lista de proyectos
   * */
  proyectos: ProyectoModel[];

  /**
   * Variable que contiene la subscripción al servicio del crud
   */
  subscriptionCrear: Subscription;

  /**
   * Configuraciones de la tabla
   * */
  paginationGroups: number[];
  defaultPagingGroup: number;
  startPagingIndex: number;
  displayedColumns: string[] = [];
  selectedRowIndex = null;

  constructor(
    private tareaService: TareaService,
    private fb: UntypedFormBuilder,
    private crudService: CrudService
  ) {
    this.paginationGroups = [5, 10, 15];
    this.defaultPagingGroup = 10;
    this.startPagingIndex = 0;
  }

  ngOnInit(): void {
    this.getProyectos();
    this.buildForm();
    this.displayedColumns = [
      'nombreProyecto',
      'fecha',
      'descripcion',
      'actions',
    ];
  }

  /**
   * Función que se ejecuta luego de iniciar el componente para cargar los registros de tareas
   *  */
  ngAfterViewInit() {
    this.cargarTareas();
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

  /**
   * Carga todas las tareas sin filtro
   */
  cargarTareas() {
    this.dataSource = new MatTableDataSource([
      {
        id: 1,
        idProyecto: 1,
        nombreProyecto: 'Prueba 1',
        fecha: new Date(),
        descripcion: 'Probando descripción',
      },
    ]);
  }

  /**
   * Busca las tareas por los criterios de búsqueda dados
   */
  buscar() {
    if (this.validateSearchForm()) {
      this.tareaService.getTareaList().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res ? res : []);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          //this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
    } else {
      this.form.setErrors({
        camposRequeridos: 'Debe ingresar al menos un criterio de búsqueda.',
      });
      this.form.markAllAsTouched();
    }
  }

  /**
   * Funcion para validar que el formulario de búsqueda no esté vacío
   */
  validateSearchForm() {
    if (
      (this.form.controls.idProyecto?.value != '' &&
        this.form.controls.idProyecto?.value != null) ||
      (this.form.controls.fechaDesde?.value != '' &&
        this.form.controls.fechaDesde?.value != null) ||
      (this.form.controls.fechaHasta?.value != '' &&
        this.form.controls.fechaHasta?.value != null) ||
      (this.form.controls.descripcion?.value != '' &&
        this.form.controls.descripcion?.value != null)
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Función que se ejecuta para crear el formulario de filtro por ciudad o tipo de animal
   * */
  buildForm() {
    this.form = this.fb.group({
      idProyecto: [],
      fechaDesde: [],
      fechaHasta: [],
      descripcion: [''],
    });
  }

  /**
   * Función para limpiar el formulario.
   */
  limpiarFormulario() {
    this.form.reset();
  }

  /**Función para agregar una tarea */
  agregarTarea() {
    this.subscriptionCrear = this.crudService
      .show({
        component: FormTareaComponent,
        dataComponent: {
          insertMode: true,
        },
        actions: {
          primary: 'Guardar',
        },
        title: 'Agregar tarea',
        maxWidth: '500px',
      })
      .subscribe((res) => {
        if (res.estado) {
          console.log('va a agregar');
          // const publicacion = res.data as PublicacionAdopcionModel;
          // publicacion.idUsuario = 1;
          // this.servicePub.addPublicacion(publicacion).subscribe((response) => {
          //   if (response) {
          //     this.openSnackBar(
          //       'Se realizó el registro de su publicación exitosamente.',
          //       'success'
          //     );
          //   }
          //   this.crudService.close(res.dialogRef);
          //   if (!this.misPubsMode) {
          //     this.getAllPubs();
          //   } else {
          //     this.getAllPubsByUser();
          //   }
          // });
        }
      });
  }

  /**
   * Función para inactivar una tarea
   */
  inactivarTarea(row: TareaModel) {
    this.crudService
      .show({
        component: GenericModalComponent,
        dataComponent: {
          editMode: true,
          nombreProyecto: row.nombreProyecto,
          fecha: row.fecha,
          descripcion: row.descripcion,
          message: '¿Está seguro que desea inactivar esta tarea?',
        },
        actions: {
          primary: 'Inactivar',
        },
        title: 'Inactivar tarea',
        maxWidth: '400px',
      })
      .subscribe((res) => {
        if (res.estado) {
          // this.servicePub.deletePublicacion(idPublicacion).subscribe((res) => {
          //   if (res) {
          //     this.openSnackBar(
          //       'Se eliminó la publicación exitosamente.',
          //       'success'
          //     );
          //   }
          //   this.crudService.close(resp.dialogRef);
          //   this.recargar.emit(true);
          // });
          console.log('inactivando');
        }
      });
  }

  /**
   * Función para finalizar una tarea
   */
  finalizarTarea(row: TareaModel) {
    this.crudService
      .show({
        component: GenericModalComponent,
        dataComponent: {
          editMode: true,
          nombreProyecto: row.nombreProyecto,
          fecha: row.fecha,
          descripcion: row.descripcion,
          message: '¿Está seguro que desea finalizar esta tarea?',
        },
        actions: {
          primary: 'Finalizar',
        },
        title: 'Finalizar tarea',
        maxWidth: '400px',
      })
      .subscribe((res) => {
        if (res.estado) {
          // this.servicePub.deletePublicacion(idPublicacion).subscribe((res) => {
          //   if (res) {
          //     this.openSnackBar(
          //       'Se eliminó la publicación exitosamente.',
          //       'success'
          //     );
          //   }
          //   this.crudService.close(resp.dialogRef);
          //   this.recargar.emit(true);
          // });
          console.log('finalizando');
        }
      });
  }
}
