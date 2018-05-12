import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddBookmarkComponent} from '../add-bookmark/add-bookmark.component';

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

  }

}
