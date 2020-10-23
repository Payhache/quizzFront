import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseAddComponent } from './reponse-add.component';

describe('ReponseAddComponent', () => {
  let component: ReponseAddComponent;
  let fixture: ComponentFixture<ReponseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReponseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
