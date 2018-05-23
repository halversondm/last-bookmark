import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatExpansionModule, MatInputModule, MatToolbarModule, MatDialogRef, MatDialog
} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AddBookmarkComponent } from './add-bookmark.component';
import { BookmarkService } from '../common/BookmarkService';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [BookmarkService],
  declarations: [AddBookmarkComponent],
  entryComponents: [AddBookmarkComponent],
  exports: [AddBookmarkComponent],
  imports: [HttpClientModule, MatButtonModule, MatCardModule,
    MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule, FormsModule, BrowserAnimationsModule]
})
class AddBookmarkComponentTestModule { }

describe('AddBookmarkComponent', () => {
  let component: AddBookmarkComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AddBookmarkComponentTestModule
      ]
    });
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(AddBookmarkComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
