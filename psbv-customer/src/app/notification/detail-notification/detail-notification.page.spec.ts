import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailNotificationPage } from './detail-notification.page';

describe('DetailNotificationPage', () => {
  let component: DetailNotificationPage;
  let fixture: ComponentFixture<DetailNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailNotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
