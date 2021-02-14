import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// Do a barrel roll -- Roll up all the "everyone uses this" modules, and export them
// in a specific third-party globals module.
//
// DO NOT EVER put app stuff in here. This is for third party dependencies, and
// third party dependencies only. If you put other "app stuff" here, you're in
// for a nightmare of cyclical dependencies. It may not be now. It may not be
// next week. But god help you, one day it will be a problem and you'll wish
// you listened to me.
//
// I'm serious, you've been warned.

const MaterialModules = [
  MatInputModule,
  MatButtonModule,
  MatFormField,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ... MaterialModules,
  ],
  exports: [
    ... MaterialModules
  ]
})
export class SharedModule { }
