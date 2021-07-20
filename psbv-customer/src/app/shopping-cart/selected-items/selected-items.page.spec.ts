import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectedItemsPage } from './selected-items.page';

describe('SelectedItemsPage', () => {
  let component: SelectedItemsPage;
  let fixture: ComponentFixture<SelectedItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
