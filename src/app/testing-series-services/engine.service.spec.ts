import { Engine } from './engine.service';

describe('Engine', () => {
  let engine: Engine;

  beforeEach(() => {
    engine = new Engine();
  });

  it('should return it\'s horsepower', () => {
    expect(engine.getHorsepower()).toEqual(150);
  });

  it('should return it\'s horsepower', () => {
    expect(engine.getName()).toEqual('Basic engine');
  });
});
