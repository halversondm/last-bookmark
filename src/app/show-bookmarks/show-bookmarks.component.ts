import {Component, OnInit} from '@angular/core';
import {Folder} from '../common/Folder';
import {BookmarkService} from '../common/bookmark.service';

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
      this.folders = folders;
    });
  }
}
