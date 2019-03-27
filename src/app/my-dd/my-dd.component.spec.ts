import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MyDDComponent } from './my-dd.component';

describe('MyDDComponent', () => {
  let component: MyDDComponent;
  let fixture: ComponentFixture<MyDDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDDComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
