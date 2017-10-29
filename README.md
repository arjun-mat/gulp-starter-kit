# Gulp Starter Kit

> A boilerplate for frontend development using Gulp, SASS, Bootstrap, MomentJS, Chosen, AngularJS 1.6, Angular UI Router and a few other libraries

> Credits to https://github.com/zakaziko99/assets-bootstrap-sass-bower-gulp.git as I used it to start off

### Techs used

This boilerplate uses a number of open source projects to work properly:

  * [NodeJs](https://nodejs.org/)
  * [Bower](http://bower.io/)
  * [Gulp](http://gulpjs.com/)
  * [Bootstrap 3](http://getbootstrap.com/)
  * [jQuery](https://jquery.com/)
  * [SASS](http://sass-lang.com/)

## Contents
* [Install dependencies](#install-dependencies)
* [Customizing gulpfile.js](#customizing-gulpfile)
* [Development workflow](#development-workflow)

### Install dependencies

#### First, get the git repository

In order to start a project with `Bootstrap SASS` & `jQuery`, first you'll better get the repo

```sh
git clone git@github.com/arjunmat/gulp-starter-kit.git
```

#### Customizing your project

Then customize your project by changing the name and delete the .git folder

```sh
mv gulp-starter-kit <project-folder>
cd <project-folder>/
rm -rf .git
```
#### Prerequisites

To use `Bootstrap SASS` & `jQuery`, your project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- bower, a fast package manager for the web frameworks, libraries, assets, and utilities.
- gulp, a Node.js-based build tool.

**To install dependencies:**

1)  Check your Node.js version.

```sh
node --version
```

The version should be at or above 0.12.x.

2)  If you don't have `Node.js` installed, or you have a lower version, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

3)  Install `bower` and `gulp`.

```sh
npm install -g bower gulp
```

This lets you run `bower` and `gulp` from the command line. (the working directory must be the root of your project)

4) Install the `Bootstrap SASS` & `jQuery` dependencies.

```sh
bower install && npm install
```

This installs Automate Tasks for better workflow.

### Customizing gulpfile

on the 'gulpfile.js' file, you can customize the build folder of your project:

```js
var paths  = {...};
```

### Development workflow

#### wiredep

Run the wiredep gulp task

```sh
gulp wiredep
```

This will add all the bower dependencies to the HTML file

#### serve

Start a local server and runs the SASS files

```sh
gulp serve
```

#### Build

Run the build gulp task

```sh
gulp build
```

This will copy all the distribution files to the build directory
