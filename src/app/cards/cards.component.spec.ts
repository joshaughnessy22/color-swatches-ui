import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'jest';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let dialogMock: { open: typeof jest.fn };

  beforeEach(async () => {
    dialogMock = { open: jest.fn() };
    component = new CardsComponent(dialogMock as any);
    // Set up initial state if needed
    component.colors = ['#111111', '#222222'];
    component.gridCols = 2;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a color when addGridItem is called and not exceed 10 colors', () => {
    component.addGridItem();
    expect(component.colors.length).toBe(3);
    expect(component.gridCols).toBe(3);
    expect(component.errorMessage).toBe('');
  });

  it('should not add more than 10 colors and show error', () => {
    component.colors = Array(10).fill('#FFFFFF');
    component.addGridItem();
    expect(component.colors.length).toBe(10);
    expect(component.errorMessage).toBe('You can only add 10 colors');
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should remove a color when removeGridItem is called and not go below 2 colors', () => {
    component.colors = ['#111111', '#222222', '#333333'];
    component.gridCols = 3;
    component.removeGridItem(1);
    expect(component.colors.length).toBe(2);
    expect(component.gridCols).toBe(2);
    expect(component.errorMessage).toBe('');
  });

  it('should not remove color if only 2 colors left and show error', () => {
    component.colors = ['#111111', '#222222'];
    component.removeGridItem(0);
    expect(component.colors.length).toBe(2);
    expect(component.errorMessage).toBe('You must have at least 2 colors');
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should update color if valid', () => {
    component.colors = ['#111111', '#222222'];
    component.updateColorsPairs = jest.fn();
    component.updateColor(0, '#ABCDEF');
    expect(component.colors[0]).toBe('#ABCDEF');
    expect(component.errorMessage).toBe('');
    expect(component.updateColorsPairs).toHaveBeenCalled();
  });

  it('should not update color if invalid and show error', () => {
    component.colors = ['#111111', '#222222'];
    component.updateColor(0, 'notAColor');
    expect(component.colors[0]).toBe('#111111');
    expect(component.errorMessage).toBe('Invalid color code');
    expect(dialogMock.open).toHaveBeenCalled();
  });
});
