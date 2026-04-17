import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageErrorComponent } from './massage-error.component';

describe('MassageErrorComponent', () => {
  let component: MassageErrorComponent;
  let fixture: ComponentFixture<MassageErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassageErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MassageErrorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
