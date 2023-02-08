import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProyectoModel } from 'src/app/model/proyecto-model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private projectURL = 'https://gestorproyectos-production.up.railway.app/gestorProyectos/api/tarea';

  constructor(private httpClient: HttpClient) {}

  /**
   * Lista de los proyectos.
   */
  getProyectoList() {
    return this.httpClient.get<ProyectoModel[]>(
      `${this.projectURL}/getAllProyectos`
    );
  }

  /**
   * Inactivar una proyecto.
   */
  inactiveTarea(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.projectURL}/inactiveProject${id}`);
  }
}
