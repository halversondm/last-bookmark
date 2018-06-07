import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {BookmarkService} from '../common/bookmark.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent implements OnInit {

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

  add(event): void {
    if (this.folderName !== undefined) {
      console.log(`folder name: ${this.folderName} existing folder: ${this.existingFolder}`);
      this._bookmarkService.addFolder(this.folderName, this.existingFolder);
      this._bookmarkService.saveBookmarks();
      this.message = 'Added!';
      setTimeout(() => this.message = '', 1000);
    } else {
      this.message = 'You have to provide a Folder Name';
    }
    event.preventDefault();
  }

}
