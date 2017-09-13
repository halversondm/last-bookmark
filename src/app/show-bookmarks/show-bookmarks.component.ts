import {Component, OnInit} from '@angular/core';
import {Folder} from "../common/Folder";
import {BookmarkService} from "../common/BookmarkService";

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
    this.folders = this._bookmarkService.getBookmarks();
  }

}
