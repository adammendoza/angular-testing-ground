import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Engine } from './engine.service';
import { Car } from './car.service';

describe('Car', () => {
  let subject: Car;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Engine, Car]
    });
    subject = TestBed.get(Car);
  });

  it('should display name with engine', () => {
    expect(subject.getName()).toEqual('Car with Basic engine(150 HP)');
  });

  it('should display name with engine', inject([Car], (car: Car) => {
    expect(car.getName()).toEqual('Car with Basic engine(150 HP)');
  }));
});

describe('CarMock', () => {
  let subject: Car;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Engine, Car]
    });

    spyOn(Engine.prototype, 'getHorsepower').and.returnValue(400);
    spyOn(Engine.prototype, 'getName').and.returnValue('V8 engine');
    subject = TestBed.get(Car);
  });

  it('should display name with engine', () => {
    expect(subject.getName()).toEqual('Car with V8 engine(400 HP)');
  });
});

@Injectable()
class V8Engine {
  getHorsepower() {
    return 400;
  }

  getName() {
    return 'V8 engine';
  }
}

describe('CarMockDI', () => {
  let subject: Car;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Engine, useClass: V8Engine },
        Car
      ]
    });
    subject = TestBed.get(Car);
  });

  it('should display name with engine', () => {
    expect(subject.getName()).toEqual('Car with V8 engine(400 HP)');
  });
});
