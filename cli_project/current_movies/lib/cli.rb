class CLI

    def run
        self.welcome
        Scraper.scrape_titles
        loop do 
            user_input = main_menu
            if user_input == "exit" || user_input.include?("n")
                return
            else
                self.list_movies
                self.choose_movie
            end
        end
    end


    def welcome
        puts "Welcome moviegoer!\n\n"
    end

    def main_menu
        puts "Would you like to see current movies?"
        input = gets.strip.downcase
        return input
    end

    def list_movies
        puts "In theaters now:\n\n"
        Movie.all.take(10).each_with_index{ |m,i| puts "#{i + 1}. #{m.title}"} 
    end 

    def choose_movie
        puts "Choose a movie to see more about"
        index = gets.strip.to_i - 1
        movie = Movie.all[index]
        Scraper.scrape_info(movie)
        self.display_movie_info(movie)
    end

    def display_movie_info(movie)
        puts "\n\n\n"
        puts movie.title
        puts movie.rating
        puts movie.length
        puts "\n\n\n"
    end

end