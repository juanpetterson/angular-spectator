import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HomeComponent } from './home.component';

fdescribe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory(HomeComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should have 3 inputs', () => {
    expect(spectator.queryAll('input').length).toEqual(3);
  });

  it('should have red color by default', () => {
    expect(spectator.query('#age-field')).toHaveStyle({ color: 'red' });
  });

  it('should have change the age field color', () => {
    const colorPickerEl = spectator.query('#color');
    spectator.typeInElement('#000066', colorPickerEl);
    // spectator.detectChanges();
    // console.log(colorPickerEl);
    expect(spectator.query('#age-field')).toHaveStyle({ color: '#000066' });
  });
});
