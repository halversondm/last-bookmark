# LastBookmark

## Description
This is the last bookmark that you will ever need.  This project allows you to track your bookmarks in an application that is decoupled from any browser.  Host it on your local machine and used it with any modern browser.  Your bookmarks are backed up to your a remote git repository of your choice.

## Dependencies

Optionally, recommended to have [git](http://git-scm.com/downloads) to be installed and that it can be called using the command `git`.

## Installation

```
npm install -g last-bookmark
```

You'll want to install this globally to run the `last-bookmark` command to start the server.  Upon on installation the `./assets` directory in the global installation folder will be initialized with a new git repository.  You will need to run the following commands to setup your remote git repo.

```
cd ./assets
git remote add origin git@github.com:<your handle>/<your repo name>.git
```
