import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { ColorsComponent } from './colors/colors.component';
import { FontComponent } from './font/font.component';
import { ErrorComponent } from './error/error.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    CardsComponent,
    ColorsComponent,
    FontComponent,
    ErrorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-template';
}
