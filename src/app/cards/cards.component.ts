import { Component } from '@angular/core';
import { ErrorComponent } from '../error/error.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [ MatGridListModule,
    MatButtonModule,
    ErrorComponent,
    NgIf, NgFor
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  colors = ['#FFFFFF', '#000000'];
  errorMessage = '';
  gridCols = 2;
  gridRows = 1;
  gridHeight = 200;
  gridWidth = 200;

  addGridItem() {
    if (this.colors.length < 11){
      this.gridCols = Math.ceil(this.colors.length / 2);
      this.gridRows = Math.ceil(this.colors.length / this.gridCols);
      this.gridHeight = 200 * this.gridRows;
      this.gridWidth = 200 * this.gridCols;

      this.errorMessage = '';

      this.colors.push(this.getRandomColor());
    }
    else {
      this.errorMessage = "You can only add 10 colors";
    }

  }

  removeGridItem(i: number){
    if(this.colors.length > 2){
      this.gridCols = Math.ceil(this.colors.length / 2);
      this.gridRows = Math.ceil(this.colors.length / this.gridCols);
      this.gridHeight = 200 * this.gridRows;
      this.gridWidth = 200 * this.gridCols;

      this.errorMessage = '';

      this.colors.splice(i, 1);
    } 
    else {
      this.errorMessage = "You must have at least 2 colors";
    }
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
