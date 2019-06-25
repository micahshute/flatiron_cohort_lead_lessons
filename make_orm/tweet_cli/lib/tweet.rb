class Tweet


    def self.all
        sql = <<-SQL
            SELECT * FROM tweets
        SQL
        # binding.pry
        data = DB[:conn].execute(sql)
        
        data.map do |tweet_data|
            xformed_tweet = self.map_data(tweet_data)
            Tweet.new(xformed_tweet)
        end
    end

    def self.map_data(data)
        return data.each_with_object({}){ |(k,v), memo| memo[k.to_sym] = v}
    end

    def self.find_by_id(id)
        sql = <<-SQL
            SELECT * FROM tweets WHERE id = ?
        SQL
        data = DB[:conn].execute(sql, id)
        self.new(map_data(data[0]))
    end
    
    attr_accessor :username, :message
    attr_reader :id
    def initialize(username:, message:, id: nil)
        @username, @message = username, message
        @id = id
    end


    def save
        sql  = <<-SQL
            INSERT INTO tweets (username, message)
            VALUES (?, ?)
        SQL

        data = DB[:conn].execute(sql, self.message, self.username)
        @id = DB[:conn].last_insert_row_id
    end


end