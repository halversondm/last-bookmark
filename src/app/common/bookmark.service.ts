import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Folder} from './Folder';
import {ILink} from './ILink';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class BookmarkService {

  folders: Folder[] = [];
  private _getBookmarksUrl = '/api/getBookmarks';

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
      if (existingFolder === undefined || existingFolder === null || existingFolder === '') {
        this.folders.push(new Folder(folderName, null, null));
      } else {
        this.folders.push(new Folder(existingFolder, [new Folder(folderName, null, null)], null));
      }
      return;
    }

    // process through the high level folders, if one matches add it.
    if (existingFolder !== undefined && existingFolder !== null && existingFolder !== '') {
      for (let i = 0; i < this.folders.length; i += 1) {
        const folder = this.folders[i];
        const foundFolder: Folder = this.findFolder(existingFolder, null, null, folder);
        if (foundFolder !== null) {
          foundFolder.folders.push(new Folder(folderName, null, null));
          return;
        }
      }
    }

    // add a new folder where the folder object already has high level entries
    this.folders.push(new Folder(folderName, null, null));

  }

  addBookmark(folderName: string, linkName: string, link: string) {
    // I have no folders at all.  I'm going to push the first one.
    if (this.folders.length === 0) {
      if (folderName === undefined || folderName === null || folderName === '') {
        this.folders.push(new Folder(null, null, [{linkName: linkName, link: link}]));
      } else {
        this.folders.push(new Folder(folderName, null, [{linkName: linkName, link: link}]));
      }
      return;
    }

    // I have a folder name to add to, go find it and add the link to its link array.
    if (folderName !== undefined && folderName !== null && folderName !== '') {
      for (let i = 0; i < this.folders.length; i += 1) {
        const folder = this.folders[i];
        const foundFolder: Folder = this.findFolder(folderName, linkName, link, folder);
        if (foundFolder !== null) {
          this.updateLinks(linkName, link, foundFolder);
          return;
        }
      }
      // I have a folder name, but the folder wasn't found in the tree.  Add the folder and the link to that folder.
      this.folders.push(new Folder(folderName, null, [{linkName: linkName, link: link}]));
      return;
    }

    // I don't have a folder name and just want to add the link to an array of links on the top level of the tree
    for (let i = 0; i < this.folders.length; i += 1) {
      const folder = this.folders[i];
      if (folder.folderName === undefined) {
        this.updateLinks(linkName, link, folder);
        return;
      }
    }

    // I don't have a folder name and just want to add the link to an array of links on the top level of the tree,
    // but I don't have a no folder name object. Add a new one to the end of the array.
    this.folders.push(new Folder(null, null, [{linkName: linkName, link: link}]));
  }

  saveBookmarks() {
    const request = new HttpRequest('PUT', '/api/saveBookmarks', this.folders, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
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
      const aLink: ILink = {linkName: linkName, link: link};
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
