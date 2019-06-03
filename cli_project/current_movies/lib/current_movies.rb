require 'open-uri'
require 'nokogiri'
require 'pry'
require_relative "current_movies/version"

module CurrentMovies
  class Error < StandardError; end
  # Your code goes here...
end

require_relative "./cli"
require_relative './movie'
require_relative './scraper'