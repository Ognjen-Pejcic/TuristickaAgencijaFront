import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPotvrdaComponent } from './pregled-potvrda.component';

describe('PregledPotvrdaComponent', () => {
  let component: PregledPotvrdaComponent;
  let fixture: ComponentFixture<PregledPotvrdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledPotvrdaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledPotvrdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
