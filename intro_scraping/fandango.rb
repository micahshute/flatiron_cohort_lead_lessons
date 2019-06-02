require 'open-uri'
require 'nokogiri'


url = "https://www.fandango.com/moviesintheaters"
pg = open(url).read
parsed_html = Nokogiri::HTML(pg)
movie_lis = parsed_html.css("h2:contains('Now Playing')~ul.visual-list.movie-list li.visual-item")
name_img_url = movie_lis.map{ |li| [
    li.css('div.visual-detail a').text.strip,
    li.css('img').first.attr('src'),
    li.css('a')[0].attr('href')
]}


class MovieScraper

    def initialize
        @baseURL = "https://www.fandango.com/"
        @urls = {now_playing: "moviesintheaters"}
    end

    def scrape_now_playing
        url = @baseURL + @urls[:now_playing]
        pg = open(url).read
        parsed_html = Nokogiri::HTML(pg)
        movie_lis = parsed_html.css("h2:contains('Now Playing')~ul.visual-list.movie-list li.visual-item")
        name_img_url = movie_lis.map{ |li| {
            name: li.css('div.visual-detail a').text.strip,
            img: li.css('img').first.attr('src'),
            info_url: li.css('a')[0].attr('href')
        }}
    end

end

class Movie 

    def self.mass_assign(movie_data)
        movie_data.map do |data_hash|
            Movie.new(data_hash[:name], data_hash[:img], data_hash[:info_url])
        end
    end

    attr_accessor :name, :img, :info_url

    def initialize(name, img, info_url)
        @name, @img, @info_url = name, img, info_url
    end
end

class MovieManager

    attr_accessor :now_playing

    def initialize
        @now_playing = []
    end

end



scraper = MovieScraper.new
data = scraper.scrape_now_playing
movies = Movie.mass_assign(data)
manager = MovieManager.new
manager.now_playing = movies

puts manager.now_playing.first.name
puts manager.now_playing.first.img
puts manager.now_playing.first.info_url
puts manager.now_playing.last.name
puts manager.now_playing.last.img
puts manager.now_playing.last.info_url
puts manager.now_playing.length