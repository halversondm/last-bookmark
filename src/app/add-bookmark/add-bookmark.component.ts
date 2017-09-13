import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {BookmarkService} from "../common/BookmarkService";

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

  constructor(public dialogRef: MdDialogRef<AddBookmarkComponent>, private _bookmarkService: BookmarkService) {
  }

  ngOnInit() {

  }

  cancel(): void {
    this.dialogRef.close();
  }

  add(): void {
    console.log(`folderName ${this.folderName}, linkName ${this.linkName}, link ${this.link}`);
    if (this.link !== undefined && this.linkName !== undefined) {
      this._bookmarkService.addBookmark(this.folderName, this.linkName, this.link);
      this.message = "Added!";
      this.dialogRef.close();
    } else {
      this.message = "You have to provide a Bookmark and Bookmark Name";
    }
  }

}
