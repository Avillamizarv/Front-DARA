import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

type informationType = 'proyectos' | 'tareas';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  /**
   * Selector referencia al tab group embarazos y subsidios familiares
   */
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  /**
   * Sección seleccionada.
   */
  seccion: informationType = 'tareas';

  ngOnInit() {
    this.subscribeMatTabGroup();
  }
  

  /**
   * Función para subscribirse a los cambios de los tabs.
   */
  subscribeMatTabGroup() {
    setTimeout(() => {
      if (typeof this.tabGroup !== 'undefined') {
        this.tabGroup.selectedTabChange.subscribe((tabSelected) => {
          if (tabSelected) {
            this.seccion = tabSelected.tab.textLabel as 'proyectos' | 'tareas';
          }
        });
      }
    }, 0);
  }
}
