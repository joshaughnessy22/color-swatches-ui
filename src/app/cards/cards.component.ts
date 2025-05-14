import { Component, Input } from '@angular/core';
import { ErrorComponent } from '../error/error.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-cards',
  imports: [ MatGridListModule,
    MatButtonModule,
    ErrorComponent,
    NgFor,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  colors = ['#F3A5B6', '#8E9437']; //default colors pink and yellow
  errorMessage = '';
  gridCols = 2;
  readonly gridRows: number = 1; // Fixed to 1 row
  readonly  gridHeight: number = 300; //fixed height of 300px

  @Input() newcolor: string = '';

  addGridItem() {
    if (this.colors.length < 11){ //do not exceed 10 colors
      this.gridCols = this.colors.length + 1; 
      this.errorMessage = ''; //reset error message
      this.colors.push(this.getRandomColor()); //add a random color card
    }
    else {
      this.errorMessage = "You can only add 10 colors"; //send error message to error component
    }

  }

  removeGridItem(i: number){
    if(this.colors.length > 2){
      this.gridCols = this.colors.length - 1;
      this.errorMessage = '';
      this.colors.splice(i, 1); //remove the ith color card
    } 
    else {
      this.errorMessage = "You must have at least 2 colors";
    }
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF'; //hex code digits
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]; //add a random digit from letters
    }
    return color;
  }

  private isValidColor(color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color); //check if input from is valid
  }

  updateColor(i: number, newColor: string): void {
    if (this.isValidColor(newColor)) {
      this.colors[i] = newColor; //add new color to the ith card
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid color code'; //send error message
    }
  }

}
