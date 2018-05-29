class Jekyll::Page

	def language
		matches = /_pages\/(.{2})\//.match(path)
    	if matches
    		matches[1]
    	else
    		site.config['default_language']
    	end
	end

	def to_liquid(attrs = ATTRIBUTES_FOR_LIQUID)
	    super(attrs + %w[
	      language
	    ])
  	end

end
