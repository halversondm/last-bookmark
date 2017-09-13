import {Component, Input, OnInit} from '@angular/core';
import {ILink} from '../common/ILink';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent implements OnInit {

  constructor() {
  }

  @Input() links: ILink[];

  ngOnInit() {
  }

}
