import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {BookmarkService} from '../common/BookmarkService';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent implements OnInit {

  link: string;
  linkName: string;
  folderName: string;
  message: string;

  constructor(private _bookmarkService: BookmarkService, public dialogRef: MdDialogRef<AddBookmarkComponent>) {
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
      this.message = 'Added!';
      setTimeout(() => this.message = '', 1000);
    } else {
      this.message = 'You have to provide a URL and a Name';
    }
  }

}
