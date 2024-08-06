import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessaggiComponent } from './messaggi.component';

describe('MessagiComponent', () => {
  let component: MessaggiComponent;
  let fixture: ComponentFixture<MessaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessaggiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
