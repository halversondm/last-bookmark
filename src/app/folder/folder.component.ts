import {Component, Input, OnInit} from '@angular/core';
import {Folder} from '../common/Folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  constructor() {
  }

  @Input() folders: Folder[];

  ngOnInit() {
  }

}
