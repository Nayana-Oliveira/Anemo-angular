import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegistration } from './product-registration';

describe('ProductRegistration', () => {
  let component: ProductRegistration;
  let fixture: ComponentFixture<ProductRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
