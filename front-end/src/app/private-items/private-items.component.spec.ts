import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateItemsComponent } from './private-items.component';

describe('PrivateItemsComponent', () => {
  let component: PrivateItemsComponent;
  let fixture: ComponentFixture<PrivateItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
