import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatCardModule, MatExpansionModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { ShowBookmarksComponent } from './show-bookmarks/show-bookmarks.component';
import { FolderComponent } from './folder/folder.component';
import { LinkItemComponent } from './link-item/link-item.component';
import { HeaderComponent } from './header/header.component';
import {BookmarkService} from './common/BookmarkService';

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
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    HttpModule,
  ],
  entryComponents: [
    AddBookmarkComponent
  ],
  providers: [BookmarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
