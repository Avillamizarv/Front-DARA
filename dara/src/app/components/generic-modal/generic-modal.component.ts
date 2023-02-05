import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
export class GenericModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
      nombreProyecto?: string;
      fecha?: Date;
      fechaRegistro?: Date;
      descripcion?: string;
    }
  ) {}
}
