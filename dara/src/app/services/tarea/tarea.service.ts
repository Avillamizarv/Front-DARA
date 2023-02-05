import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaModel } from 'src/app/model/tarea-model';



@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private userURL = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) {}

  /**
   * Lista de las tareas.
   */
  getTareaList() {
    return this.httpClient.get<TareaModel[]>(`${this.userURL}/getUsers`);
  }

  /**
   * Crea una nueva tarea.
   */
  createTarea(tarea: TareaModel): Observable<Object> {
    return this.httpClient.post(`${this.userURL}/newUser`, tarea);
  }

  
  /**
   * Inactivar una tarea.
   */
  inactiveTarea(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.userURL}/deleteUser${id}`);
  }

  /**
   * Finalizar una tarea.
   */
  endTarea(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.userURL}/deleteUser${id}`);
  }
}
