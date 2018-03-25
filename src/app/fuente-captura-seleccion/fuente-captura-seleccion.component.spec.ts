import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuenteCapturaSeleccionComponent } from './fuente-captura-seleccion.component';

describe('FuenteCapturaSeleccionComponent', () => {
  let component: FuenteCapturaSeleccionComponent;
  let fixture: ComponentFixture<FuenteCapturaSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuenteCapturaSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuenteCapturaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
