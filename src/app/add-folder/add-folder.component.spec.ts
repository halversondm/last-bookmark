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

import {AddFolderComponent} from './add-folder.component';
import {BookmarkService} from '../common/bookmark.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

@NgModule({
  providers: [BookmarkService],
  declarations: [AddFolderComponent],
  entryComponents: [AddFolderComponent],
  exports: [AddFolderComponent],
  imports: [HttpClientTestingModule, MatButtonModule, MatCardModule,
    MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule, FormsModule, BrowserAnimationsModule]
})
class AddFolderComponentTestModule {
}

describe('AddFolderComponent', () => {
  let unit: AddFolderComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AddFolderComponentTestModule
      ]
    });
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(AddFolderComponent);
    unit = dialogRef.componentInstance;
  });

  afterEach(() => {
    unit.close();
  });

  it('should be created', () => {
    expect(unit).toBeTruthy();
  });

  it('should add a folder', () => {
    unit.existingFolder = 'Test';
    unit.folderName = 'Test2';
    unit.add();
    expect(unit.message).toEqual(unit.SUCCESS);
  });

  it('will not add a folder', () => {
    unit.add();
    expect(unit.message).toEqual(unit.FAIL);
  });
});
