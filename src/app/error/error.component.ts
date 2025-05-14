import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-error',
  imports: [MatDialogModule, MatButtonModule],
  standalone: true,
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: { message: string }) 
    {}
}
