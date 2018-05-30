# Metlika
Source code for site hosted at http://metlika.eu

## Architecture

Static, multilingual site build with [Jekyll](https://jekyllrb.com/). It has a few custom translation helpers in the plugin directory, apart from that it's really plain vanilla.

## Development

If you need to run the site locally, do as follows.

1. Install ruby (see (.ruby_version)[https://github.com/calleo/metlika/blob/master/.ruby-version] for which version to install). Preferrably use somethig like [RBEnv](https://github.com/rbenv/rbenv) to install.
2. Install bundler: `gem install bundler`
3. Clone the repository: `git clone https://github.com/calleo/metlika.git`
4. Install required gems: `bundle install`
5. Build site and serve it: `bundle exec jekyll serve`

## Deployment

This is done automatically using [travis-ci](https://travis-ci.org/). See [.travis.yml](https://github.com/calleo/metlika/blob/master/.travis.yml) for details.

## Content Management

Content is paced in two folders:

* \_data
* \_pages

### \_data

Contains the texts (and their translations) for the start page (and a few terms that are displayed on the other pages). The folder contains three files:

* highlights.json - highlights displayed on the start page and their translations
* testimonials.json - testimonials displayed on the start page and their translations
* translations.json - title and other terms used on the start page and other pages

### \_pages

This folder contains all sub-pages. The pages are separated into sub-folders, one folder for each language.

Pages will automatically appear in the menu.

To create a new page, create a new file with the extension .md. Add the [FrontMatter](https://jekyllrb.com/docs/frontmatter/) settings at the top of the new file:

`---`

`title: Put the page title here, i.e. Impressium`

`layout: page`

`sort_order: 100`

`---`

'layout' should always be 'page'. 'sort_order' determines where in the menu this page should appear (low to high). 

## Images

There are a few images on the web site, they are all stored in the folder [images](https://github.com/calleo/metlika/tree/master/images). To change an image, delete the file you whish to change and upload a new image with identical name as the one you deleted.
