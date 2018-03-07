import {Component, OnInit} from '@angular/core';
import {Folder} from '../common/Folder';
import {BookmarkService} from '../common/BookmarkService';

@Component({
  selector: 'app-show-bookmarks',
  templateUrl: './show-bookmarks.component.html',
  styleUrls: ['./show-bookmarks.component.css']
})
export class ShowBookmarksComponent implements OnInit {

  folders: Folder[];

  constructor(private _bookmarkService: BookmarkService) {
  }

  ngOnInit() {
    this._bookmarkService.getBookmarks().subscribe((folders) => {
      this.folders = this.recursiveConvert(folders);
      this._bookmarkService.folders = this.folders;
    });
  }

  recursiveConvert(folders: Folder[]): Folder[] {
    if (folders == null) {
      return null;
    }
    for (let i = 0; i < folders.length; i += 1) {
      const folder = folders[i];
      folders[i] = new Folder(folder.folderName, this.recursiveConvert(folder.folders), folder.links);
    }
    return folders;
  }

}
