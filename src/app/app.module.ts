import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {AddBookmarkComponent} from './add-bookmark/add-bookmark.component';
import {ShowBookmarksComponent} from './show-bookmarks/show-bookmarks.component';
import {FolderComponent} from './folder/folder.component';
import {LinkItemComponent} from './link-item/link-item.component';
import {HeaderComponent} from './header/header.component';
import {BookmarkService} from './common/BookmarkService';
import {AddFolderComponent} from './add-folder/add-folder.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBookmarkComponent,
    ShowBookmarksComponent,
    FolderComponent,
    LinkItemComponent,
    HeaderComponent,
    AddFolderComponent
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
    HttpClientModule,
  ],
  entryComponents: [
    AddBookmarkComponent,
    AddFolderComponent
  ],
  providers: [BookmarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
