import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaToolsComponent } from './dmca-tools.component';

describe('DmcaToolsComponent', () => {
  let component: DmcaToolsComponent;
  let fixture: ComponentFixture<DmcaToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
