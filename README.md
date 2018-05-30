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

See [wiki](https://github.com/calleo/metlika/wiki).
