import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardsComponent } from './cards/cards.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    CardsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-template';
}
