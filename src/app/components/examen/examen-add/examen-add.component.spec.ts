import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenAddComponent } from './examen-add.component';

describe('ExamenAddComponent', () => {
  let component: ExamenAddComponent;
  let fixture: ComponentFixture<ExamenAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
