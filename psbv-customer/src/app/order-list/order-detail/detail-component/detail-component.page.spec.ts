import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailComponentPage } from './detail-component.page';

describe('DetailComponentPage', () => {
  let component: DetailComponentPage;
  let fixture: ComponentFixture<DetailComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
