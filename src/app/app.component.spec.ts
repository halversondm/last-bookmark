import { TestBed, async } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { BookmarkService } from './common/BookmarkService';
import { FolderComponent } from './folder/folder.component';
import { HeaderComponent } from './header/header.component';
import { LinkItemComponent } from './link-item/link-item.component';
import { ShowBookmarksComponent } from './show-bookmarks/show-bookmarks.component';
import { HttpClientModule } from '@angular/common/http';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BookmarkService],
      declarations: [
        AppComponent, HeaderComponent, ShowBookmarksComponent, FolderComponent, LinkItemComponent
      ],
      // tslint:disable-next-line:max-line-length
      imports: [HttpClientModule, MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
