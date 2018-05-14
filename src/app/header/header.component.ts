import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddBookmarkComponent} from '../add-bookmark/add-bookmark.component';
import {AddFolderComponent} from '../add-folder/add-folder.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
  }

  constructor(public dialog: MatDialog) {
  }

  openBookmarkDialog() {
    this.dialog.open(AddBookmarkComponent, {
      height: '350px',
      width: '500px'
    });
  }

  openFolderDialog() {
    this.dialog.open(AddFolderComponent, {
      height: '250px',
      width: '500px'
    });
  }

}
