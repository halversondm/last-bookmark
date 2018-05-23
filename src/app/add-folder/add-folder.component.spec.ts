import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatExpansionModule, MatInputModule, MatToolbarModule, MatDialogRef, MatDialog
} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AddFolderComponent } from './add-folder.component';
import { BookmarkService } from '../common/BookmarkService';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [BookmarkService],
  declarations: [AddFolderComponent],
  entryComponents: [AddFolderComponent],
  exports: [AddFolderComponent],
  imports: [HttpClientModule, MatButtonModule, MatCardModule,
    MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule, FormsModule, BrowserAnimationsModule]
})
class AddFolderComponentTestModule { }

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
