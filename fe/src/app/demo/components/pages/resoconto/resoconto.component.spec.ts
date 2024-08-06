import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResocontoComponent } from './resoconto.component';

describe('ResocontoComponent', () => {
  let component: ResocontoComponent;
  let fixture: ComponentFixture<ResocontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResocontoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResocontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
