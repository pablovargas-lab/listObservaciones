import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManObsComponent } from './modal-man-obs.component';

describe('ModalManObsComponent', () => {
  let component: ModalManObsComponent;
  let fixture: ComponentFixture<ModalManObsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalManObsComponent]
    });
    fixture = TestBed.createComponent(ModalManObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
