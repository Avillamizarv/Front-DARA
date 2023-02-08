import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProyectoModel } from 'src/app/model/proyecto-model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private userURL = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) {}

  /**
   * Lista de los proyectos.
   */
  getProyectoList(filtro?: String) {
    return this.httpClient.get<ProyectoModel[]>(
      `${this.userURL}/getProjects/${filtro}`
    );
  }

  /**
   * Inactivar una proyecto.
   */
  inactiveTarea(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.userURL}/inactiveProject${id}`);
  }
}
