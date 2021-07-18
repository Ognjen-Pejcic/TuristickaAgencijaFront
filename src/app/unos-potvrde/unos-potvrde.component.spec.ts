import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosPotvrdeComponent } from './unos-potvrde.component';

describe('UnosPotvrdeComponent', () => {
  let component: UnosPotvrdeComponent;
  let fixture: ComponentFixture<UnosPotvrdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosPotvrdeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosPotvrdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
