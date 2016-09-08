import { Injectable } from '@angular/core';

@Injectable()
export class Engine {
  getHorsepower() {
    return 150;
  }

  getName() {
    return 'Basic engine';
  }
}
