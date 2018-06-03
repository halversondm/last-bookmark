import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Folder } from './Folder';
import { ILink } from './ILink';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class BookmarkService {

  private _getBookmarksUrl = '/assets/api/bookmarks/bookmarks.json';

  folders: Folder[];

  constructor(private _http: HttpClient) {
  }

  getBookmarks(): Observable<Folder[]> {
    return this._http.get(this._getBookmarksUrl)
      .pipe(
        map(this.convertToFolder),
        catchError(this.handleError('getBookmarks', []))
      );
  }

  convertToFolder(response) {
    console.log(response);
    const folders = response;
    this.folders = folders;
    return folders;
  }

  addFolder(folderName: string, existingFolder: string) {
    // no folders, just add the first one to the folders object
    if (this.folders.length === 0) {
      if (existingFolder === undefined) {
        this.folders.push(new Folder(folderName, null, null));
      } else {
        this.folders.push(new Folder(existingFolder, [new Folder(folderName, null, null)], null));
      }
      return;
    }

    // process through the high level folders, if one matches add it.
    if (existingFolder !== undefined && existingFolder !== '') {
      for (let i = 0; i < this.folders.length; i += 1) {
        const folder = this.folders[i];
        const foundFolder: Folder = this.findFolder(existingFolder, null, null, folder);
        if (foundFolder !== null) {
          foundFolder.folders.push(new Folder(folderName, null, null));
          return;
        }
      }
      return;
    }

    // add a new folder where the folder object already has high level entries
    this.folders.push(new Folder(folderName, null, null));

  }

  addBookmark(folderName: string, linkName: string, link: string) {
    // no folders, just add the first one to the folders object
    if (this.folders.length === 0) {
      if (linkName === null && link === null) {
        this.folders.push(new Folder(folderName, null, null));
      } else {
        this.folders.push(new Folder(folderName, null, [{ linkName: linkName, link: link }]));
      }
      return;
    }

    // process through the high level folders, if one matches add it.
    for (let i = 0; i < this.folders.length; i += 1) {
      const folder = this.folders[i];
      if ((folder.folderName === undefined || folder.folderName === null) && folderName === undefined) {
        this.updateLinks(linkName, link, folder);
        return;
      } else {
        const foundFolder: Folder = this.findFolder(folderName, linkName, link, folder);
        if (foundFolder !== null) {
          this.updateLinks(linkName, link, foundFolder);
          return;
        }
      }
    }

    // add a new folder where the folder object already has high level entries
    this.folders.push(new Folder(folderName, null, [{ linkName: linkName, link: link }]));

  }

  saveBookmarks() {
    const request = new HttpRequest('PUT', '/api/saveBookmarks', this.folders, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      reportProgress: true
    });
    const save = this._http.request<Folder[]>(request)
      .pipe(
        catchError(this.handleError('saveBookmarks', [])),
        tap(event => console.log(event))
      );
    save.subscribe();
  }

  updateLinks(linkName: string, link: string, folder: Folder): Folder {
    if (linkName !== null && link !== null) {
      const aLink: ILink = { linkName: linkName, link: link };
      folder.links.push(aLink);
    }
    return folder;
  }

  findFolder(folderName: string, linkName: string, link: string, folder: Folder): Folder {
    if (folder.folderName === folderName) {
      return folder;
    } else {
      if (folder.folders.length > 0) {
        for (let i = 0; i < folder.folders.length; i += 1) {
          const currentChild = folder.folders[i];
          const result = this.findFolder(folderName, linkName, link, currentChild);
          if (result !== null) {
            return result;
          }
        }
        return null;
      } else {
        return null;
      }
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
