import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionExtractComponent } from './transaction-extract.component';

describe('TransactionExtractComponent', () => {
  let component: TransactionExtractComponent;
  let fixture: ComponentFixture<TransactionExtractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionExtractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
