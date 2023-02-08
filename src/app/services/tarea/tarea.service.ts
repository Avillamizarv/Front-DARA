import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TareaModel } from 'src/app/model/tarea-model';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private tareaURL =
    'https://gestorproyectos-production.up.railway.app/gestorProyectos/api/tarea';

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {}

  /**
   * Lista de las tareas.
   */
  getTareaList() {
    return this.httpClient.get<TareaModel[]>(
      `${this.tareaURL}/getAllSinFinalizadosNiInactivos`
    );
  }

  /**
   * Crea una nueva tarea.
   */
  createTarea(tarea: TareaModel): Observable<Object> {
    return this.httpClient.post(`${this.tareaURL}/crear`, tarea).pipe(
      catchError((err) => {
        this.openSnackBar('Hubo un error interno.', 'error');
        return throwError(err);
      }),
      tap((res) => {
        if (!res) {
          this.openSnackBar('Su tarea no se pudo registrar.', 'error');
        }
      })
    );
  }

  /**
   * Inactivar una tarea.
   */
  inactiveTarea(id: number): Observable<Object> {
    return this.httpClient
      .post(`${this.tareaURL}/cambiarEstado?idTarea=${id}&estado=INACTIVA`, '')
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        })
      );
  }

  /**
   * Finalizar una tarea.
   */
  endTarea(id: number): Observable<Object> {
    return this.httpClient
      .post(`${this.tareaURL}/finalizar?idTarea=${id}`, '')
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        })
      );
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
