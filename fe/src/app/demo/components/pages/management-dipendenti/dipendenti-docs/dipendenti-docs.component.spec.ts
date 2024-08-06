import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipendentiDocsComponent } from './dipendenti-docs.component';

describe('DipendentiDocsComponent', () => {
  let component: DipendentiDocsComponent;
  let fixture: ComponentFixture<DipendentiDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DipendentiDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DipendentiDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
