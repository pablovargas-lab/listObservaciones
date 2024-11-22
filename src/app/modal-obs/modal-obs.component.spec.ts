import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObsComponent } from './modal-obs.component';

describe('ModalObsComponent', () => {
  let component: ModalObsComponent;
  let fixture: ComponentFixture<ModalObsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalObsComponent]
    });
    fixture = TestBed.createComponent(ModalObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
