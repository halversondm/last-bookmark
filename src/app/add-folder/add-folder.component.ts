import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {BookmarkService} from '../common/bookmark.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent implements OnInit {

  SUCCESS = 'Added!';
  FAIL = 'You have to provide a Folder Name';
  folderName: string;
  existingFolder: string;
  message: string;

  constructor(private _bookmarkService: BookmarkService, public dialogRef: MatDialogRef<AddFolderComponent>) {
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    if (this.folderName !== undefined) {
      this._bookmarkService.addFolder(this.folderName, this.existingFolder);
      this._bookmarkService.saveBookmarks();
      this.message = this.SUCCESS;
      setTimeout(() => this.message = '', 1000);
    } else {
      this.message = this.FAIL;
    }
  }

}
