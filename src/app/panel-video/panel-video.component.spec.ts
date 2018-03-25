import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVideoComponent } from './panel-video.component';

describe('PanelVideoComponent', () => {
  let component: PanelVideoComponent;
  let fixture: ComponentFixture<PanelVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
