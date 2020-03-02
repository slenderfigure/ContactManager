import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
 
const materialComponents = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatStepperModule
];

@NgModule({
  exports: [materialComponents],
  imports: [materialComponents]
})
export class MaterialModule { }
