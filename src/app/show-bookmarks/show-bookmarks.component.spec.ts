import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { ShowBookmarksComponent } from './show-bookmarks.component';
import { FolderComponent } from '../folder/folder.component';
import { LinkItemComponent } from '../link-item/link-item.component';
import { BookmarkService } from '../common/BookmarkService';
import { HttpClientModule } from '@angular/common/http';

describe('ShowBookmarksComponent', () => {
  let component: ShowBookmarksComponent;
  let fixture: ComponentFixture<ShowBookmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BookmarkService],
      declarations: [ShowBookmarksComponent, FolderComponent, LinkItemComponent],
      imports: [HttpClientModule, MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule]
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
