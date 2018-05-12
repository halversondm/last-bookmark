import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptionsArgs, Response} from '@angular/http';
import {Folder} from './Folder';
import {ILink} from './ILink';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class BookmarkService {

  private _getBookmarksUrl = '/assets/api/bookmarks/bookmarks.json';

  folders: Folder[];

  constructor(private _http: Http) {
  }

  getBookmarks(): Observable<Folder[]> {
    return this._http.get(this._getBookmarksUrl)
      .pipe(
        map(this.convertToFolder)
      );
  }

  convertToFolder(response: Response) {
    const folders = <Folder[]>response.json();
    // console.log('All : ', folders);
    this.folders = folders;
    return folders;
  }

  addBookmark(folderName: string, linkName: string, link: string) {
    // console.log(`folderName ${folderName}, linkName ${linkName}, link ${link}`);

    // no folders, just add the first one to the folders object
    if (this.folders.length === 0) {
      this.folders.push(new Folder(folderName, null, [{linkName: linkName, link: link}]));
      return;
    }

    // process through the high level folders, if one matches add it.
    for (let i = 0; i < this.folders.length; i += 1) {
      const folder = this.folders[i];
      if ((folder.folderName === undefined || folder.folderName === null) && folderName === undefined) {
        this.updateLinks(linkName, link, folder);
        return;
      } else {
        if (this.findFolder(folderName, linkName, link, folder)) {
          return;
        }
      }
    }

    // add a new folder where the folder object already has high level entries
    this.folders.push(new Folder(folderName, null, [{linkName: linkName, link: link}]));

  }

  saveBookmarks() {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const httpHeaders: RequestOptionsArgs = {
      headers: headers
    };
    const save = this._http.post('/api/saveBookmarks', this.folders, httpHeaders);
    save.subscribe();
  }

  findFolder(folderName: string, linkName: string, link: string, folder: Folder): boolean {
    if (folder.folderName === folderName) {
      this.updateLinks(linkName, link, folder);
      return true;
    } else {
      if (folder.folders !== undefined && folder.folders !== null) {
        for (let i = 0; i < folder.folders.length; i += 1) {
          const currentChild = folder.folders[i];
          const result = this.findFolder(folderName, linkName, link, currentChild);
          if (result) {
            return result;
          }
        }
        return false;
      } else {
        return false;
      }
    }
  }

  updateLinks(linkName: string, link: string, folder: Folder): Folder {
    const aLink: ILink = {linkName: linkName, link: link};
    if (folder.links === undefined) {
      folder.links = [];
    }
    folder.links.push(aLink);
    return folder;
  }

}
