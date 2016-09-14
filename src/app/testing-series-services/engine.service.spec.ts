import { Engine } from './engine.service';

describe('Engine', () => {
  let subject: Engine;

  beforeEach(() => {
    subject = new Engine();
  });

  it('should return it\'s horsepower', () => {
    expect(subject.getHorsepower()).toEqual(150);
  });

  it('should return it\'s horsepower', () => {
    expect(subject.getName()).toEqual('Basic engine');
  });
});
