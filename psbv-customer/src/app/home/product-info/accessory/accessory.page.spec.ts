import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccessoryPage } from './accessory.page';

describe('AccessoryPage', () => {
  let component: AccessoryPage;
  let fixture: ComponentFixture<AccessoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
