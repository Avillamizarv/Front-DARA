import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormTareaComponent } from './components/form-tarea/form-tarea.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TareasComponent,
    ProyectosComponent,
    FormTareaComponent,
    GenericModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    MatIconModule,
    BrowserAnimationsModule,
    CoreModule,
    MatDialogModule,
    CommonModule,
    MatInputModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
