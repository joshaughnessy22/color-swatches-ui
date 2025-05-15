import { Component, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor} from '@angular/common';

@Component({
  selector: 'app-font',
  imports: [MatFormFieldModule, MatSelectModule, MatOptionModule, NgFor],
  templateUrl: './font.component.html',
  styleUrl: './font.component.css'
})
export class FontComponent {
  @Output() fontChange = new EventEmitter<string>(); // Emit font changes

  selectedFont: string = 'Arial, sans-serif';

  fonts = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Courier New', value: '"Courier New", monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
    { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Impact', value: 'Impact, sans-serif' },
    { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
    { name: 'Lucida Console', value: '"Lucida Console", monospace' },
    { name: 'Tahoma', value: 'Tahoma, sans-serif' },
    { name: 'Palatino Linotype', value: '"Palatino Linotype", serif' }
  ];

  onFontChange(font: string) {
    this.selectedFont = font;
    this.fontChange.emit(font); // Emit the selected font
  }
}
