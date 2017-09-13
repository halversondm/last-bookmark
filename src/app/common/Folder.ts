import {ILink} from "./ILink";

/**
 * A folder has folders, a folder has links or a folder has links and folders.
 */
export class Folder {
  folderName: string;
  folders: Folder[];
  links: ILink[];
  display: boolean = false;

  constructor(folderName: string, folders: Folder[], links: ILink[]) {
    this.folderName = folderName;
    this.folders = folders;
    this.links = links;
  }

  toggle() {
    this.display = !this.display;
  }
}
