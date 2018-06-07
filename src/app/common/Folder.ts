import {ILink} from './ILink';

/**
 * A folder has folders, a folder has links or a folder has links and folders.
 */
export class Folder {
  folderName: string;
  folders: Folder[];
  links: ILink[];
  display = false;

  constructor(folderName: string, folders: Folder[], links: ILink[]) {
    if (folderName === undefined) {
      this.display = true;
    }
    this.folderName = folderName;
    if (folders === undefined || folders === null) {
      this.folders = [];
    } else {
      this.folders = folders;
    }
    if (links === undefined || links === null) {
      this.links = [];
    } else {
      this.links = links;
    }
  }

  toggle() {
    this.display = !this.display;
  }
}
