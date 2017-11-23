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
  //public dialogRef: MdDialogRef<AddBookmarkComponent>,

  constructor(private _bookmarkService: BookmarkService) {
  }

  ngOnInit() {

  }

  cancel(): void {
    //this.dialogRef.close();
  }

  add(): void {
    if (this.link !== undefined && this.linkName !== undefined) {
      this._bookmarkService.addBookmark(this.folderName, this.linkName, this.link);
      this.message = "Added!";
      //this.dialogRef.close();
    } else {
      this.message = "You have to provide a Bookmark and Bookmark Name";
    }
  }

}
