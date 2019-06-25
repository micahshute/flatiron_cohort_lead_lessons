class TweetApp


    def start
        while true

            puts "Enter a username:"
            username = gets.strip
            puts "Enter a message:"
            message = gets.strip

            tweet = Tweet.new(username: username, message: message)
            tweet.save
            render_tweets
            binding.pry
        end
    end


    def render_tweets

        Tweet.all.each.with_index(1) do |tw, i|
            puts "#{i}. #{tw.username} \n #{tw.message}\n\n\n"
        end

    end

end