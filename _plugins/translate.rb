require 'byebug'

module Jekyll
	class TranslateTag < Liquid::Tag

	    def initialize(tag_name, key, tokens)
	      	@key = key.strip
	    end

	    def current_language(context)
	    	matches = /_pages\/(.{2})\//.match(context['page']['path'])
	    	if matches
	    		matches[1]
	    	else
	    		context['site']['default_language']
	    	end
	    end

	    def render(context)
	    	context['site'].data['translations'][current_language(context)][@key]
	    end
  	end
end

Liquid::Template.register_tag('translate', Jekyll::TranslateTag)