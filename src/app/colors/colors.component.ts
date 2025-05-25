import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-colors',
  imports: [MatGridListModule, MatButtonModule, NgFor, MatGridTile],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})
export class ColorsComponent implements OnChanges {
  @Input() pairs: { color1: string; color2: string; contrast?: number }[] = [];
  @Input() selectedFont = 'Arial, sans-serif'; // Default font

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pairs'] && changes['pairs'].currentValue) {
      this.orderByContrast();
      console.log('New pairs received:', this.pairs);
    }
    if (changes['selectedFont'] && changes['selectedFont'].currentValue) {
      console.log('New font received:', this.selectedFont);
    }
  }

  private orderByContrast(): void {
    // Calculate contrast for each pair
    this.pairs.forEach(pair => {
      pair.contrast = this.calculateContrast(pair.color1, pair.color2);
    });

    // Sort pairs by contrast in descending order
    this.pairs.sort((a, b) => (b.contrast || 0) - (a.contrast || 0));
  }

  calculateContrast(color1: string, color2: string): number {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);

    const contrast = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return parseFloat(contrast.toFixed(2));
  }

  private getLuminance(hex: string): number {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 0;

    const [r, g, b] = rgb.map(channel => {
      const c = channel / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private hexToRgb(hex: string): [number, number, number] | null {
    const sanitizedHex = hex.replace('#', '');
    if (sanitizedHex.length === 3) {
      const r = parseInt(sanitizedHex[0] + sanitizedHex[0], 16);
      const g = parseInt(sanitizedHex[1] + sanitizedHex[1], 16);
      const b = parseInt(sanitizedHex[2] + sanitizedHex[2], 16);
      return [r, g, b];
    } else if (sanitizedHex.length === 6) {
      const r = parseInt(sanitizedHex.slice(0, 2), 16);
      const g = parseInt(sanitizedHex.slice(2, 4), 16);
      const b = parseInt(sanitizedHex.slice(4, 6), 16);
      return [r, g, b];
    }
    return null;
  }

}
