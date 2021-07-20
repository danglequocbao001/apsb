import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpgradePage } from './upgrade.page';

describe('UpgradePage', () => {
  let component: UpgradePage;
  let fixture: ComponentFixture<UpgradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
