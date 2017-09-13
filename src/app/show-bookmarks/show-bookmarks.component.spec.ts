import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookmarksComponent } from './show-bookmarks.component';

describe('ShowBookmarksComponent', () => {
  let component: ShowBookmarksComponent;
  let fixture: ComponentFixture<ShowBookmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBookmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
