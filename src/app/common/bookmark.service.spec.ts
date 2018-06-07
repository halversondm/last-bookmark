import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookmarkService} from './bookmark.service';
import {Folder} from './Folder';

describe('Bookmark Service', () => {
  let unit: BookmarkService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [BookmarkService], imports: [HttpClientTestingModule]});
    httpTestingController = TestBed.get(HttpTestingController);
    unit = TestBed.get(BookmarkService);
  });

  it('should be created', () => {
    expect(unit).toBeTruthy();
  });

  it('should get bookmarks from server', () => {
    const testData: Folder[] = [new Folder('Dan', null, null)];
    unit.getBookmarks().subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error) => {
        fail();
      });
    const req = httpTestingController.expectOne('/api/getBookmarks');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  afterEach(() => {
    console.log('unit.folders = ', JSON.stringify(unit.folders));
  });

  it('should add a new folder', () => {
    unit.addFolder('Dan', undefined);
    expect(unit.folders.length).toEqual(1);
  });

  it('should add a new folder to an existing folder', () => {
    unit.addFolder('Dan', undefined);
    unit.addFolder('Megan', 'Dan');
    expect(unit.folders.length).toEqual(1);
    expect(unit.folders[0].folders.length).toEqual(1);
  });

  it('should add a new folder to an existing folder, on one pass', () => {
    unit.addFolder('Megan', 'Dan');
    expect(unit.folders.length).toEqual(1);
    expect(unit.folders[0].folders.length).toEqual(1);
  });

  it('should add a new folder, but an existing folder is passed that does not exist', () => {
    unit.addFolder('Dan', null);
    unit.addFolder('Ryan', 'Courtney');
    expect(unit.folders.length).toEqual(2);
  });

  it('should add a new bookmark where the folders array is empty in a new folder', () => {
    unit.addBookmark('Dan', 'Facebook', 'https://facebook.com');
    expect(unit.folders.length).toEqual(1);
  });

  it('should add a new bookmark where the folders array is empty without a folder', () => {
    unit.addBookmark(null, 'Facebook', 'https://facebook.com');
    expect(unit.folders.length).toEqual(1);
    expect(unit.folders[0].folderName).toBe(null);
  });

  it('should add a new bookmark where the folders array is populated in a existing folder', () => {
    unit.addBookmark('Dan', 'Facebook', 'https://facebook.com');
    unit.addBookmark('Dan', 'Twitter', 'https://twitter.com');
    expect(unit.folders.length).toEqual(1);
    expect(unit.folders[0].links.length).toEqual(2);
  });

  it('should add a new bookmark where the folders array is populated and the new link is in a new folder', () => {
    unit.addBookmark('Dan', 'Facebook', 'https://facebook.com');
    unit.addBookmark('Megan', 'Twitter', 'https://twitter.com');
    expect(unit.folders.length).toEqual(2);
  });

  it('should add a new bookmark where the folders array is populated and the new link is at the root', () => {
    unit.addBookmark('Dan', 'Facebook', 'https://facebook.com');
    unit.addBookmark('', 'Twitter', 'https://twitter.com');
    expect(unit.folders.length).toEqual(2);
  });

});
