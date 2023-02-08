import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/common/services/crud.service';
import { ProyectoModel } from 'src/app/model/proyecto-model';
import { ProyectoService } from 'src/app/services/proyecto/proyecto.service';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent {
  /**
   * Vistas a componentes hijos para el paginador y ordenamiento de la tabla.
   * */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Variable que contiene la data de la tabla
   */
  dataSource = new MatTableDataSource<ProyectoModel>();
  /**
   * Configuraciones de la tabla
   * */
  paginationGroups: number[];
  defaultPagingGroup: number;
  startPagingIndex: number;
  displayedColumns: string[] = [];
  selectedRowIndex = null;

  /**
   * Variable que contiene el formulario de filtro
   */
  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private proyectoService: ProyectoService,
    private snackbar: MatSnackBar,
    private crudService: CrudService
  ) {
    this.paginationGroups = [5, 10, 15];
    this.defaultPagingGroup = 10;
    this.startPagingIndex = 0;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      filtro: [],
    });
    this.displayedColumns = ['nombre', 'fechaRegistro', 'actions'];
    this.listenFilterChanges();
  }

  /**
   * Función que se ejecuta luego de iniciar el componente para cargar los registros de proyectos
   *  */
  ngAfterViewInit() {
    this.cargarProyectos();
    this.dataSource.sort = this.sort;
  }

  /**
   * Función para escuchar los cambios en el campo de filtro de los proyectos
   */
  listenFilterChanges() {
    this.form.controls.filtro.valueChanges.subscribe((value) => {
      if (value) {
        this.cargarProyectos(value);
      }
    });
  }
  /**
   * Función para cargar los proyectos filtrados o sin filtrar
   */
  cargarProyectos(filtro?: String) {
    this.proyectoService.getProyectoList().subscribe((res) => {
      if (res) {
        this.dataSource = new MatTableDataSource(res ? res : []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    // this.dataSource = new MatTableDataSource([
    //   { id: 1, nombre: 'Mi proyecto 1', fechaRegistro: new Date() },
    //   { id: 2, nombre: 'Mi proyecto 2', fechaRegistro: new Date() },
    //   {
    //     id: 3,
    //     nombre: 'Adri mi proyecto 1',
    //     fechaRegistro: new Date(),
    //   },
    //   {
    //     id: 1,
    //     nombre: 'último proyecto 1',
    //     fechaRegistro: new Date(),
    //   },
    // ]);
    // this.proyectoService.getProyectoList(filtro).subscribe({
    //   next: (res) => {
    //     this.dataSource = new MatTableDataSource(
    //       res
    //         ? res
    //         : [
    //             { id: 1, nombre: 'Mi proyecto 1', fechaRegistro: new Date() },
    //             { id: 2, nombre: 'Mi proyecto 2', fechaRegistro: new Date() },
    //             {
    //               id: 3,
    //               nombre: 'Adri mi proyecto 1',
    //               fechaRegistro: new Date(),
    //             },
    //             {
    //               id: 1,
    //               nombre: 'último proyecto 1',
    //               fechaRegistro: new Date(),
    //             },
    //           ]
    //     );
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   error: (err) => {
    //     //this.dataSource = new MatTableDataSource([]);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    // });
  }

  /**
   * Función para inactivar un proyecto
   */
  inactivarProyecto(row: ProyectoModel) {
    this.crudService
      .show({
        component: GenericModalComponent,
        dataComponent: {
          editMode: true,
          nombreProyecto: row.nombre,
          fechaRegistro: row.fechaRegistro,
          message: '¿Está seguro que desea inactivar este proyecto?',
        },
        actions: {
          primary: 'Inactivar',
        },
        title: 'Inactivar proyecto',
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
   * Función para mostrar snackbars de notificaciones
   */
  openSnackBar(message: string, tipo: string) {
    this.snackbar.open(message, 'Ok', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
      panelClass: tipo,
    });
  }
}
