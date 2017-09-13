import {Injectable} from "@angular/core";
import {Folder} from "./Folder";
import {ILink} from "./ILink";

@Injectable()
export class BookmarkService {

  folders: Folder[];

  constructor() {
    let favesLinks = [{linkName: "Google", link: "https://google.com"}, {
      linkName: "Facebook",
      link: "https://facebook.com"
    }];
    let faves = new Folder("Favorites", null, favesLinks);
    let nextNextLevelLinks = [{linkName: "The Burritt Cup", link: "https://theburrittcup.com"}];
    let nextNextLevel = new Folder("Next Next Level", null, nextNextLevelLinks);
    let nextLevelLinks = [{linkName: "halversondm", link: "https://halversondm.com"}];
    let nextLevel = new Folder("Next Level", null, nextLevelLinks);
    let topLevel = new Folder("Top Level", [nextLevel, nextNextLevel], null);

    let solo = new Folder(null, null, [{linkName: "Google News", link: "https://news.google.com"}]);

    this.folders = [faves, topLevel, solo];
  }

  getBookmarks(): Folder[] {
    return this.folders;
  }

  addBookmark(folderName: string, linkName: string, link: string) {
    console.log(`folderName ${folderName}, linkName ${linkName}, link ${link}`);

    for (let i = 0; i < this.folders.length; i += 1) {
      let folder = this.folders[i];
      if ((folder.folderName === undefined || folder.folderName === null) && folderName === undefined) {
        this.updateLinks(linkName, link, folder);
        return;
      } else {
        // recursive folder logic?
        if (this.findFolder(folderName, linkName, link, folder)) {
          return;
        }
      }
    }
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

  updateLinks(linkName: string, link: string, folder: Folder) {
    let aLink: ILink = {linkName: linkName, link: link};
    if (folder.links === undefined) {
      folder.links = [];
    }
    folder.links.push(aLink);
  }

}
