import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdButtonModule, MdDialogModule, MdInputModule, MdCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { ShowBookmarksComponent } from './show-bookmarks/show-bookmarks.component';
import { FolderComponent } from './folder/folder.component';
import { LinkItemComponent } from './link-item/link-item.component';
import { HeaderComponent } from './header/header.component';
import {BookmarkService} from "./common/BookmarkService";

@NgModule({
  declarations: [
    AppComponent,
    AddBookmarkComponent,
    ShowBookmarksComponent,
    FolderComponent,
    LinkItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdCardModule,
  ],
  entryComponents: [
    AddBookmarkComponent
  ],
  providers: [BookmarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
