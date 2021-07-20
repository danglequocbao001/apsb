import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotiTrackingPage } from './noti-tracking.page';

describe('NotiTrackingPage', () => {
  let component: NotiTrackingPage;
  let fixture: ComponentFixture<NotiTrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiTrackingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotiTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
