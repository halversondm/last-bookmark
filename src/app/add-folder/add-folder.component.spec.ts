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
  let component: AddFolderComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AddFolderComponentTestModule
      ]
    });
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(AddFolderComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
