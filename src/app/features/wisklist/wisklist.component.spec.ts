import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WisklistComponent } from './wisklist.component';

describe('WisklistComponent', () => {
  let component: WisklistComponent;
  let fixture: ComponentFixture<WisklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WisklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WisklistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
