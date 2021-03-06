import {TestBed} from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

import {AddBookmarkComponent} from './add-bookmark.component';
import {BookmarkService} from '../common/bookmark.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

@NgModule({
  providers: [BookmarkService],
  declarations: [AddBookmarkComponent],
  entryComponents: [AddBookmarkComponent],
  exports: [AddBookmarkComponent],
  imports: [HttpClientTestingModule, MatButtonModule, MatCardModule,
    MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule, FormsModule, BrowserAnimationsModule]
})
class AddBookmarkComponentTestModule {
}

describe('AddBookmarkComponent', () => {
  let unit: AddBookmarkComponent;
  let dialog: MatDialog;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AddBookmarkComponentTestModule
      ]
    });
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(AddBookmarkComponent);
    unit = dialogRef.componentInstance;
  });

  afterEach(() => {
    unit.close();
  });

  it('should be created', () => {
    expect(unit).toBeTruthy();
  });

  it('should add a bookmark', () => {
    unit.link = 'https://facebook.com';
    unit.linkName = 'Facebook';
    unit.folderName = 'Test';
    unit.add();
    expect(unit.message).toEqual(unit.SUCCESS);
  });

  it('will not add a bookmark', () => {
    unit.add();
    expect(unit.message).toEqual(unit.FAIL);
  });
});
