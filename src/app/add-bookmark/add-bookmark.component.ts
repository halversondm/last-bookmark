import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {BookmarkService} from '../common/bookmark.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent implements OnInit {

  SUCCESS = 'Added';
  FAIL = 'You have to provide a URL and a Name';
  link: string;
  linkName: string;
  folderName: string;
  message: string;

  constructor(private _bookmarkService: BookmarkService, public dialogRef: MatDialogRef<AddBookmarkComponent>) {
  }

  ngOnInit() {

  }

  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    if (this.link !== undefined && this.linkName !== undefined) {
      this._bookmarkService.addBookmark(this.folderName, this.linkName, this.link);
      this._bookmarkService.saveBookmarks();
      this.message = this.SUCCESS;
      setTimeout(() => this.message = '', 1000);
    } else {
      this.message = this.FAIL;
    }
  }

}
