# Metlika
Source code for site hosted at http://metlika.eu

## Architecture

Static, multilingual site build with [Jekyll](https://jekyllrb.com/). It has a few custom translation helpers in the plugin directory, apart from that it's vanilla jekyll.

## Development

If you need to run the site locally, do as follows.

1. Install ruby (see (.ruby_version)[https://github.com/calleo/metlika/blob/master/.ruby-version] for which version to install). Preferrably use somethig like [rbenv](https://github.com/rbenv/rbenv) to install.
2. Install bundler: `gem install bundler`
3. Clone the repository: `git clone https://github.com/calleo/metlika.git`
4. Install required gems: `bundle install`
5. Build site and serve it: `bundle exec jekyll serve`

## Deployment

This is done automatically using [travis-ci](https://travis-ci.org/). See [.travis.yml](https://github.com/calleo/metlika/blob/master/.travis.yml) for details. Site is hosted at [surge.sh](https://surge.sh/).

## Content Management

Content is located in two folders:

* \_data
* \_pages

### \_data

Contains the texts (and their translations) for the start page plus a few terms that are displayed on the other pages. The folder contains three files:

* highlights.json - highlights displayed on the start page and their translations
* testimonials.json - testimonials displayed on the start page and their translations
* translations.json - title and other terms used on the start page and other pages

#### Update

Locate the file you wish to edit, for example [highlights.json](https://github.com/calleo/metlika/blob/master/_data/highlights.json). Click the pen-icon (edit) and perform the necessary changes using the editor. When you are finished, click on "Commit changes". Updated content will appear a few minutes later on the site.

### \_pages

This folder contains all pages (except start page) that can be accessed from the menu. New pages will automatically appear in the menu.

The `_pages` directory contains sub-folders for each language (i.e. [_pages/de](https://github.com/calleo/metlika/tree/master/_pages/de) contains all pages in german).

#### Update page

Locate the file using the github interface that you wish to edit. For example [about_metlika.md](https://github.com/calleo/metlika/blob/master/_pages/de/about_metlika.md). Click the pen-icon (edit) and update the document as you wish. When you are done click "Commit Changes". Changes will be visible on the web-site a few minutes later.

#### New page

To create a new page, first locate the appropriate language folder (i.e. (_pages/de)[https://github.com/calleo/metlika/tree/master/_pages/de]). Click on "Create new file". Choose a filename ending with ".md". Then add this header at the top of the new file:

`---`

`title: Put the page title here, i.e. Impressium`

`layout: page`

`sort_order: 100`

`---`

_layout_ should always be _page_. _sort_order_ determines where in the menu this page should appear (low means higher). 

Content is then inserted below the header using markdown-language. See [kramdown reference](https://kramdown.gettalong.org/quickref.html) for documentation on how to format content. Also see existing pages for examples.

#### Insert image on page

* Go to the [image](https://github.com/calleo/metlika/tree/master/images) directory
* Click on "Upload files" and choose which files to upload from your computer
* Click on "Commit changes"
* Go to the page where the image should appear, click the pen-icon (edit)
* Insert `![My File](/images/my_file.jpg)` where the image should appear. Replace "my_file.jpg" with the actual filename and "My File" with text describing the image.

## Images

There are a few images on the web site, they are all stored in the folder [images](https://github.com/calleo/metlika/tree/master/images). To change an image, delete the file you whish to change and upload a new image with identical name as the one you deleted. Image has to be properly formatted before uploading it.
