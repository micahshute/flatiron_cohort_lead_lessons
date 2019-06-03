class Scraper

    BASE_URL = "https://www.fandango.com/moviesintheaters"

    def self.scrape_titles
        pg = open(BASE_URL)
        parsed_html = Nokogiri::HTML(pg)
        movie_lis = parsed_html.css("h2:contains('Now Playing')~ul.visual-list.movie-list li.visual-item")
        movie_lis.each do |li| 
            input_args = {
            title: li.css('div.visual-detail a').text.strip,
            url: li.css('a')[0].attr('href')
            }
            Movie.new(input_args)
        end
    end


    def self.scrape_info(movie)
        url = movie.url
        html = Nokogiri::HTML(open(url))
        # binding.pry
        details = html.css("ul.movie-details__detail li")[2].text.split(',').map(&:strip)
        movie.rating = details[0]
        movie.length = details[1]
    end
end