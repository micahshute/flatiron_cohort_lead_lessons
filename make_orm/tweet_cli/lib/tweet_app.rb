
class TweetApp


    def start
        loop do
            self.display_menu_options
            thing_to_do = gets.strip
            case thing_to_do
            when "id"
                puts "Please enter an id to search for"
                id = self.validate_tweet_id
                next if id.nil?
                tweet = Tweet.find_by_id(id)
                puts; puts;
                display_tweet(tweet)
            when "n"
                puts "Enter a username:"
                username = gets.strip
                puts "Enter a message:"
                message = gets.strip
                tweet = Tweet.new(username: username, message: message)
                tweet.save
                display_tweet(tweet)
            when "d"
                puts "Enter the id of the tweet you wish to delete"
                id = self.validate_tweet_id
                next if id.nil?
                Tweet.delete_by_id(id)
                puts "\n\nRecord expunged\n\n"
            when "su"
                puts "Enter the username of the tweets you wish to lookup"
                username = gets.strip.downcase
                self.display_tweets(Tweet.find_by_username(username))
            when "sc"
                puts "Enter the content you wish to search for"
                content = gets.strip.downcase
                self.display_tweets(Tweet.find_by_content(content))
            when "ls"
                render_tweets
            when "e"
                puts "Goodbye."
                return
            else
                puts "That is not a supported function"
            end
            
           

        end
    end

    def display_menu_options
        puts
        puts "What do you want to do?"
        puts "-----------------------"
        puts "[id] Tweet lookup by id"
        puts "[n] Make new tweet"
        puts "[d] Delete tweet by id"
        puts "[su] Search tweets by username"
        puts "[sc] Search tweets by content"
        puts "[ls] Display all tweets"
        puts "[e] To exit program"
        puts
    end

    def validate_tweet_id(valid_range = Tweet.all.map(&:id))
        id = gets.strip.to_i
        while !valid_range.include? id
            puts "You must enter a valid tweet id. Type q to return to main menu."
            id = gets.strip
            return nil if id.downcase == "q"
            id = id.to_i
        end
        return id
    end

    def display_tweets(tweets)
        tweets.each{ |t| self.display_tweet(t)}
    end

    def display_tweet(tweet)
        puts "\n----------------------------------------------------"
        puts "| #{tweet.id}. #{tweet.username}\n| \n| #{tweet.message}\n"
        puts "----------------------------------------------------\n\n"
    end

    def render_tweets
        Tweet.all.each do |tweet|
            display_tweet(tweet)
        end
    end

end