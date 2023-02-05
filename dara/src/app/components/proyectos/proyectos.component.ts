import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectoModel } from 'src/app/model/proyecto-model';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent {
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

  constructor(private fb: UntypedFormBuilder) {
    this.paginationGroups = [5, 10, 15];
    this.defaultPagingGroup = 10;
    this.startPagingIndex = 0;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      filtro: [],
    });
    this.displayedColumns = ['proyecto', 'fechaRegistro', 'actions'];
  }
}
