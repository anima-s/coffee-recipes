import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NutritionalInfoPage } from './nutritional-info.page';

describe('NutritionalInfoPage', () => {
  let component: NutritionalInfoPage;
  let fixture: ComponentFixture<NutritionalInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionalInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
