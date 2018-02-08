import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptionsArgs, Response} from '@angular/http';
import {Folder} from "./Folder";
import {ILink} from "./ILink";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class BookmarkService {

  private _getBookmarksUrl = "/assets/api/bookmarks/bookmarks.json";

  folders: Folder[];

  constructor(private _http: Http) {
  }

  getBookmarks(): Observable<Folder[]> {
    return this._http.get(this._getBookmarksUrl)
      .map(this.convertToFolder)
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  convertToFolder(response: Response) {
    let folders = <Folder[]>response.json();
    console.log('All : ', folders);
    this.folders = folders;
    return folders;
  }

  addBookmark(folderName: string, linkName: string, link: string) {
    // console.log(`folderName ${folderName}, linkName ${linkName}, link ${link}`);

    if (this.folders.length === 0 ) {
      this.folders.push(new Folder(folderName, null, [{linkName: linkName, link: link}]));
      return;
    }

    for (let i = 0; i < this.folders.length; i += 1) {
      let folder = this.folders[i];
      if ((folder.folderName === undefined || folder.folderName === null) && folderName === undefined) {
        this.updateLinks(linkName, link, folder);
        return;
      } else {
        if (this.findFolder(folderName, linkName, link, folder)) {
          return;
        }
      }
    }
  }

  saveBookmarks() {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    const httpHeaders: RequestOptionsArgs =
      {
        headers: headers
      };
    let save = this._http.post("/api/saveBookmarks", this.folders, httpHeaders)
      .catch(this.handleError);
    save.subscribe();
  }

  findFolder(folderName: string, linkName: string, link: string, folder: Folder): boolean {
    if (folder.folderName === folderName) {
      this.updateLinks(linkName, link, folder);
      return true;
    } else {
      if (folder.folders !== undefined && folder.folders !== null) {
        for (let i = 0; i < folder.folders.length; i += 1) {
          let currentChild = folder.folders[i];
          let result = this.findFolder(folderName, linkName, link, currentChild);
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
    let aLink: ILink = {linkName: linkName, link: link};
    if (folder.links === undefined) {
      folder.links = [];
    }
    folder.links.push(aLink);
    return folder;
  }

}
